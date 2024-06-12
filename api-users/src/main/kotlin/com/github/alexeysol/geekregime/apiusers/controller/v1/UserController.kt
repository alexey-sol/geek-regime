package com.github.alexeysol.geekregime.apiusers.controller.v1

import com.github.alexeysol.geekregime.apicommons.constant.Default
import com.github.alexeysol.geekregime.apicommons.exception.ResourceException
import com.github.alexeysol.geekregime.apicommons.model.dto.shared.HasIdDto
import com.github.alexeysol.geekregime.apicommons.model.dto.user.UserDto
import com.github.alexeysol.geekregime.apicommons.model.exception.ErrorDetail
import com.github.alexeysol.geekregime.apicommons.util.converter.PageableConverter
import com.github.alexeysol.geekregime.apicommons.util.converter.SearchableConverter
import com.github.alexeysol.geekregime.apiusers.constant.PathConstant.API_V1_PATH
import com.github.alexeysol.geekregime.apiusers.constant.UserConstant.EMAIL_FIELD
import com.github.alexeysol.geekregime.apiusers.constant.UserConstant.ID_FIELD
import com.github.alexeysol.geekregime.apiusers.constant.UserConstant.OLD_PASSWORD_FIELD
import com.github.alexeysol.geekregime.apiusers.constant.UserConstant.PASSWORD_FIELD
import com.github.alexeysol.geekregime.apiusers.constant.UserConstant.SEARCHABLE_FIELDS
import com.github.alexeysol.geekregime.apiusers.constant.UserConstant.SLUG_FIELD
import com.github.alexeysol.geekregime.apiusers.constant.UserConstant.SORTABLE_FIELDS
import com.github.alexeysol.geekregime.apiusers.model.dto.AuthDto
import com.github.alexeysol.geekregime.apiusers.model.dto.CreateUserDto
import com.github.alexeysol.geekregime.apiusers.model.dto.UpdateUserDto
import com.github.alexeysol.geekregime.apiusers.service.v1.UserService
import com.github.alexeysol.geekregime.apiusers.util.assertPassword
import com.github.alexeysol.geekregime.apiusers.util.assertPasswordsMatchIfNeeded
import com.github.alexeysol.geekregime.apiusers.mapper.UserMapper
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.http.HttpStatus
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import javax.validation.ConstraintViolationException
import javax.validation.Valid

@RestController
@RequestMapping(path = [API_V1_PATH], produces = ["application/json"])
@Validated
class UserController(
    val service: UserService,
    val mapper: UserMapper
) {
    @PostMapping("auth")
    fun authenticate(@RequestBody @Valid dto: AuthDto): UserDto {
        val user = dto.email?.let { service.findUserByEmail(it) }
            ?: throw ResourceException(ErrorDetail(ErrorDetail.Code.ABSENT, EMAIL_FIELD))

        try {
            assertPassword(dto.password, user.credentials);
            return mapper.fromUserToUserDto(user);
        } catch (exception: IllegalArgumentException) {
            throw ResourceException(ErrorDetail(ErrorDetail.Code.MISMATCH, PASSWORD_FIELD))
        }
    }

    @GetMapping
    fun findAllUsers(
        @RequestParam ids: List<Long>?,
        @RequestParam paging: String?,
        @RequestParam sortBy: String?,
        @RequestParam searchBy: String?
    ): Page<UserDto> {
        val pageableConverter = PageableConverter(paging, sortBy, SORTABLE_FIELDS)
        val searchableConverter = SearchableConverter(searchBy, SEARCHABLE_FIELDS)

        try {
            val pageable = pageableConverter.value
            val searchByDto = searchableConverter.value

            val usersPage =
                if (ids !== null) service.findAllUsersById(ids, pageable)
                else if (searchByDto !== null) service.searchUsers(searchByDto, pageable)
                else service.findAllUsers(pageable)

            val userDtoList = mapper.fromUserListToUserDtoList(usersPage.content);
            return PageImpl(userDtoList, pageable, usersPage.totalElements)
        } catch (exception: IllegalArgumentException) {
            throw ResourceException(HttpStatus.UNPROCESSABLE_ENTITY, exception.message);
        } catch (exception: ConstraintViolationException) {
            throw ResourceException(HttpStatus.UNPROCESSABLE_ENTITY, exception.message);
        }
    }

    // TODO split into 2 endpoints. The one with slug would be: "slug/{slug}"
    @GetMapping("{idOrSlug}")
    fun findUserByIdOrSlug(@PathVariable idOrSlug: String): UserDto {
        val assumeId = idOrSlug.toLongOrNull(10) !== null;

        val user = if (assumeId) {
            service.findUserById(idOrSlug.toLong())
                ?: throw ResourceException(ErrorDetail(ErrorDetail.Code.ABSENT, ID_FIELD))
        } else {
            service.findUserBySlug(idOrSlug)
                ?: throw ResourceException(ErrorDetail(ErrorDetail.Code.ABSENT, SLUG_FIELD))
        }

        return mapper.fromUserToUserDto(user)
    }

    @GetMapping("email/{email}")
    fun findUserByEmail(@PathVariable email: String): UserDto {
        val user = service.findUserByEmail(email)
            ?: throw ResourceException(ErrorDetail(ErrorDetail.Code.ABSENT, EMAIL_FIELD))

        return mapper.fromUserToUserDto(user)
    }

    @PostMapping
    fun createUser(@RequestBody @Valid dto: CreateUserDto): UserDto {
        if (service.userByEmailExists(dto.email)) {
            throw ResourceException(ErrorDetail(ErrorDetail.Code.ALREADY_EXISTS, EMAIL_FIELD))
        }

        val user = mapper.fromCreateUserDtoToUser(dto)
        val createdUser = service.saveUser(user)
        return mapper.fromUserToUserDto(createdUser)
    }

    @PatchMapping("{id}")
    fun updateUser(
        @PathVariable id: Long,
        @RequestBody @Valid dto: UpdateUserDto
    ): UserDto {
        dto.email?.let {
            if (service.userByEmailExists(it)) {
                throw ResourceException(ErrorDetail(ErrorDetail.Code.ALREADY_EXISTS, EMAIL_FIELD))
            }
        }

        val user = service.findUserById(id)
            ?: throw ResourceException(ErrorDetail(ErrorDetail.Code.ABSENT, ID_FIELD))

        try {
            assertPasswordsMatchIfNeeded(dto.oldPassword, dto.newPassword, user.credentials)
        } catch (exception: IllegalArgumentException) {
            throw ResourceException(ErrorDetail(ErrorDetail.Code.MISMATCH, OLD_PASSWORD_FIELD))
        }

        val entity = mapper.fromUpdateUserDtoToUser(dto, user)
        val updatedUser = service.saveUser(entity)
        return mapper.fromUserToUserDto(updatedUser)
    }

    @DeleteMapping("{id}")
    fun removeUserById(@PathVariable id: Long): HasIdDto {
        val result = service.removeUserById(id)
        val isNotFound = result == Default.NOT_FOUND_BY_ID

        if (isNotFound) {
            throw ResourceException(ErrorDetail(ErrorDetail.Code.ABSENT, ID_FIELD))
        }

        return mapper.fromIdToHasIdDto(id)
    }
}

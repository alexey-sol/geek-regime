package com.github.alexeysol.geekregime.apiusers.controllers.v1

import com.github.alexeysol.geekregime.apicommons.constants.Defaults
import com.github.alexeysol.geekregime.apicommons.exceptions.ResourceException
import com.github.alexeysol.geekregime.apicommons.models.dtos.shared.HasIdDto
import com.github.alexeysol.geekregime.apicommons.models.dtos.users.UserDto
import com.github.alexeysol.geekregime.apicommons.models.exceptions.ErrorDetail
import com.github.alexeysol.geekregime.apicommons.utils.converters.PageableConverter
import com.github.alexeysol.geekregime.apicommons.utils.converters.SearchableConverter
import com.github.alexeysol.geekregime.apiusers.models.dtos.AuthDto
import com.github.alexeysol.geekregime.apiusers.models.dtos.CreateUserDto
import com.github.alexeysol.geekregime.apiusers.models.dtos.UpdateUserDto
import com.github.alexeysol.geekregime.apiusers.services.v1.UserService
import com.github.alexeysol.geekregime.apiusers.utils.assertPassword
import com.github.alexeysol.geekregime.apiusers.utils.assertPasswordsMatchIfNeeded
import com.github.alexeysol.geekregime.apiusers.utils.mappers.UserMapper
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.http.HttpStatus
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import javax.validation.ConstraintViolationException
import javax.validation.Valid

private const val EMAIL_FIELD = "email"
private const val ID_FIELD = "id"
private const val OLD_PASSWORD_FIELD = "oldPassword"
private const val PASSWORD_FIELD = "password"

private val sortableFields: List<String> = listOf("createdAt", "details.name", "email", "id")
private val searchableFields: List<String> = listOf("details.name")

@RestController
@RequestMapping(
    path = [com.github.alexeysol.geekregime.apiusers.constants.PathConstants.API_V1_PATH],
    produces = ["application/json"]
)
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
        val pageableConverter = PageableConverter(paging, sortBy, sortableFields)
        val searchableConverter = SearchableConverter(searchBy, searchableFields)

        try {
            val pageable = pageableConverter.pageable
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

    @GetMapping("{idOrEmail}")
    fun findUserByIdOrEmail(@PathVariable idOrEmail: String): UserDto {
        val assumeId = idOrEmail.toLongOrNull(10) !== null;

        val user = if (assumeId) {
            service.findUserById(idOrEmail.toLong())
                ?: throw ResourceException(ErrorDetail(ErrorDetail.Code.ABSENT, ID_FIELD))
        } else {
            service.findUserByEmail(idOrEmail)
                ?: throw ResourceException(ErrorDetail(ErrorDetail.Code.ABSENT, EMAIL_FIELD))
        }

        return mapper.fromUserToUserDto(user)
    }

    @PostMapping
    fun createUser(@RequestBody @Valid dto: CreateUserDto): UserDto {
        if (service.userAlreadyExists(dto.email)) {
            throw ResourceException(ErrorDetail(ErrorDetail.Code.ALREADY_EXISTS, EMAIL_FIELD))
        }

        val user = mapper.fromCreateUserDtoToUser(dto)
        val createdUser = service.createUser(user, dto.password)
        return mapper.fromUserToUserDto(createdUser)
    }

    @PatchMapping("{id}")
    fun updateUser(
        @PathVariable id: Long,
        @RequestBody @Valid dto: UpdateUserDto
    ): UserDto {
        dto.email?.let {
            if (service.userAlreadyExists(it)) {
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
        val updatedUser = service.updateUser(id, entity, dto.newPassword)
        return mapper.fromUserToUserDto(updatedUser)
    }

    @DeleteMapping("{id}")
    fun removeUserById(@PathVariable id: Long): HasIdDto {
        val result = service.removeUserById(id)
        val isNotFound = result == Defaults.NOT_FOUND_BY_ID

        if (isNotFound) {
            throw ResourceException(ErrorDetail(ErrorDetail.Code.ABSENT, ID_FIELD))
        }

        return mapper.fromIdToHasIdDto(id)
    }
}

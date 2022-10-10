package com.github.alexeysol.geekregimeapiusers.controllers.v1

import com.github.alexeysol.geekregimeapicommons.constants.DefaultsConstants
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceException
import com.github.alexeysol.geekregimeapicommons.models.dtos.DeletionResultDto
import com.github.alexeysol.geekregimeapicommons.models.dtos.UserDto
import com.github.alexeysol.geekregimeapicommons.utils.converters.PageableConverter
import com.github.alexeysol.geekregimeapiusers.constants.PathConstants
import com.github.alexeysol.geekregimeapiusers.models.dtos.CreateUserDto
import com.github.alexeysol.geekregimeapiusers.models.dtos.UpdateUserDto
import com.github.alexeysol.geekregimeapiusers.services.v1.UserService
import com.github.alexeysol.geekregimeapiusers.utils.assertPasswordsMatchIfNeeded
import com.github.alexeysol.geekregimeapiusers.utils.mappers.UserMapper
import com.github.alexeysol.geekregimeapiusers.utils.sources.ApiUsersSource
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.http.HttpStatus
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

private const val EMAIL_FIELD = "email"
private const val ID_FIELD = "id"
private const val OLD_PASSWORD_FIELD = "oldPassword"
private val sortByUserFields: List<String> = listOf("createdAt", "details.name", "email", "id")

@RestController
@RequestMapping(
    path = [PathConstants.API_V1_PATH],
    produces = ["application/json"]
)
@Validated
class UserController(
    val service: UserService,
    val mapper: UserMapper,
    source: ApiUsersSource
) {
    private val resource = source.resource

    @GetMapping
    fun findAllUsers(
        @RequestParam ids: List<Long>?,
        @RequestParam paging: String?,
        @RequestParam sortBy: String?
    ): Page<UserDto> {
        val pageableConverter = PageableConverter(paging, sortBy, sortByUserFields)
        val pageable = pageableConverter.pageable

        val usersPage =
            if (ids === null) service.findAllUsers(pageable)
            else service.findAllUsersById(ids, pageable)

        val userDtoList = mapper.fromUserListToUserDtoList(usersPage.content);
        return PageImpl(userDtoList, pageable, usersPage.totalElements)
    }

    @GetMapping("{id}")
    fun findUserById(@PathVariable id: Long): UserDto {
        val user = service.findUserById(id)
            ?: throw ResourceException(HttpStatus.NOT_FOUND, ID_FIELD, resource)

        return mapper.fromUserToUserDto(user)
    }

    @PostMapping
    fun createUser(@RequestBody @Valid dto: CreateUserDto): UserDto {
        if (service.userAlreadyExists(dto.email)) {
            throw ResourceException(HttpStatus.CONFLICT, EMAIL_FIELD, resource)
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
                throw ResourceException(HttpStatus.CONFLICT, EMAIL_FIELD, resource)
            }
        }

        val user = service.findUserById(id)
            ?: throw ResourceException(HttpStatus.NOT_FOUND, ID_FIELD, resource)

        try {
            assertPasswordsMatchIfNeeded(dto.oldPassword, dto.newPassword, user.credentials)
        } catch (exception: IllegalArgumentException) {
            throw ResourceException(HttpStatus.FORBIDDEN, OLD_PASSWORD_FIELD, resource)
        }

        val entity = mapper.fromUpdateUserDtoToUser(dto, user)
        val updatedUser = service.updateUser(id, entity, dto.newPassword)
        return mapper.fromUserToUserDto(updatedUser)
    }

    @DeleteMapping("{id}")
    fun removeUserById(@PathVariable id: Long): DeletionResultDto {
        val result = service.removeUserById(id)
        val isNotFound = result == DefaultsConstants.NOT_FOUND_BY_ID

        if (isNotFound) {
            throw ResourceException(HttpStatus.NOT_FOUND, ID_FIELD, resource)
        }

        return mapper.fromIdToDeletionResultDto(id)
    }
}

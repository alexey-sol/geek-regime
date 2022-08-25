package com.github.alexeysol.geekregimeapiusers.controllers.v1

import com.github.alexeysol.geekregimeapicommons.constants.ApiResource
import com.github.alexeysol.geekregimeapicommons.constants.DefaultValueConstants
import com.github.alexeysol.geekregimeapicommons.exceptions.BaseResourceException
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceAlreadyExistsException
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceNotFoundException
import com.github.alexeysol.geekregimeapicommons.models.Pair
import com.github.alexeysol.geekregimeapicommons.utils.converters.QueryConverter
import com.github.alexeysol.geekregimeapiusers.constants.PathConstants
import com.github.alexeysol.geekregimeapiusers.models.dtos.CreateUserDto
import com.github.alexeysol.geekregimeapiusers.models.dtos.UpdateUserDto
import com.github.alexeysol.geekregimeapiusers.models.dtos.UserDto
import com.github.alexeysol.geekregimeapiusers.services.v1.UserService
import com.github.alexeysol.geekregimeapiusers.utils.mappers.UserMapper
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@RestController
@RequestMapping(
    path = [PathConstants.API_V1_PATH],
    produces = ["application/json"]
)
@Validated
class UserController(
    val service: UserService,
    val userMapper: UserMapper
) {
    @GetMapping
    fun findAllUsers(
        @RequestParam ids: List<Long>?,
        @RequestParam paging: String?,
        @RequestParam sortBy: String?
    ): Page<UserDto> {
        val queryConverter = QueryConverter(paging, sortBy)
        val pageable = queryConverter.pageable

        val usersPage =
            if (ids === null) service.findAllUsers(pageable)
            else service.findAllUsersById(ids, pageable)

        val userDtoList = userMapper.allEntitiesToUserDtoList(usersPage.content);
        return PageImpl(userDtoList, pageable, usersPage.totalElements)
    }

    @GetMapping("{id}")
    @Throws(BaseResourceException::class)
    fun findUserById(@PathVariable id: Long): UserDto {
        val user = service.findUserById(id)
            ?: throw ResourceNotFoundException(ApiResource.USER, id)

        return userMapper.entityToUserDto(user)
    }

    @PostMapping
    @Throws(BaseResourceException::class)
    fun createUser(@RequestBody @Valid dto: CreateUserDto): UserDto {
        if (service.userAlreadyExists(dto.email)) {
            throw ResourceAlreadyExistsException(ApiResource.USER, Pair("email", dto.email))
        }

        val user = userMapper.createUserDtoToEntity(dto)
        val createdUser = service.createUser(user, dto.password)
        return userMapper.entityToUserDto(createdUser)
    }

    @PatchMapping("{id}")
    @Throws(BaseResourceException::class)
    fun updateUser(
        @PathVariable id: Long,
        @RequestBody @Valid dto: UpdateUserDto
    ): UserDto {
        dto.email?.let {
            if (service.userAlreadyExists(it)) {
                throw ResourceAlreadyExistsException(ApiResource.USER, Pair("email", it))
            }
        }

        val user = userMapper.updateUserDtoToEntity(dto, id)
        val updatedUser = service.updateUser(id, user, dto.newPassword)
        return userMapper.entityToUserDto(updatedUser)
    }

    @DeleteMapping("{id}")
    @Throws(BaseResourceException::class)
    fun removeUserById(@PathVariable id: Long): Long? {
        val result = service.removeUserById(id)
        val userIsDeleted = result != DefaultValueConstants.NOT_FOUND_BY_ID

        if (userIsDeleted) {
            return result
        }

        throw ResourceNotFoundException(ApiResource.USER, id)
    }
}

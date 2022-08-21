package com.github.alexeysol.geekregimeapiusers.controllers.v1

import com.github.alexeysol.geekregimeapicommons.constants.DefaultValueConstants
import com.github.alexeysol.geekregimeapicommons.exceptions.BaseResourceException
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceAlreadyExistsException
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceNotFoundException
import com.github.alexeysol.geekregimeapicommons.models.ApiResource
import com.github.alexeysol.geekregimeapicommons.models.Pair
import com.github.alexeysol.geekregimeapiusers.constants.PathConstants
import com.github.alexeysol.geekregimeapiusers.models.dtos.CreateUserDto
import com.github.alexeysol.geekregimeapiusers.models.dtos.UserDto
import com.github.alexeysol.geekregimeapiusers.models.dtos.UpdateUserDto
import com.github.alexeysol.geekregimeapiusers.services.v1.UserService
import com.github.alexeysol.geekregimeapiusers.utils.mappers.UserDtoMapper
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
    val userDtoMapper: UserDtoMapper
) {
    @GetMapping
    fun findAllUsers(@RequestParam ids: List<Long>?): List<UserDto> {
        val users = if (ids === null) service.findAllUsers()
        else service.findAllUsersById(ids)

        return userDtoMapper.allEntitiesToUserDtos(users)
    }

    @GetMapping("{id}")
    @Throws(BaseResourceException::class)
    fun findUserById(@PathVariable id: Long): UserDto {
        val user = service.findUserById(id)
            ?: throw ResourceNotFoundException(ApiResource.USER, id)

        return userDtoMapper.entityToUserDto(user)
    }

    @PostMapping
    @Throws(BaseResourceException::class)
    fun createUser(@RequestBody @Valid dto: CreateUserDto): UserDto {
        if (service.userAlreadyExists(dto.email)) {
            throw ResourceAlreadyExistsException(ApiResource.USER, Pair("email", dto.email))
        }

        val user = userDtoMapper.createUserDtoToEntity(dto)
        val createdUser = service.createUser(user, dto.password)
        return userDtoMapper.entityToUserDto(createdUser)
    }

    @PatchMapping("{id}")
    @Throws(BaseResourceException::class)
    fun updateUser(
        @PathVariable id: Long,
        @RequestBody @Valid dto: UpdateUserDto
    ): UserDto {
        val user = userDtoMapper.updateUserDtoToEntity(dto, id)
        val updatedUser = service.updateUser(id, user, dto.newPassword)
        return userDtoMapper.entityToUserDto(updatedUser)
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

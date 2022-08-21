package com.github.alexeysol.geekregimeapiusers.utils.mappers

import com.github.alexeysol.geekregimeapicommons.constants.DefaultValueConstants
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceForbiddenException
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceNotFoundException
import com.github.alexeysol.geekregimeapicommons.models.ApiResource
import com.github.alexeysol.geekregimeapicommons.models.Pair
import com.github.alexeysol.geekregimeapiusers.models.dtos.CreateUserDto
import com.github.alexeysol.geekregimeapiusers.models.dtos.UserDto
import com.github.alexeysol.geekregimeapiusers.models.dtos.UpdateUserDto
import com.github.alexeysol.geekregimeapiusers.models.entities.Credentials
import com.github.alexeysol.geekregimeapiusers.models.entities.User
import com.github.alexeysol.geekregimeapiusers.services.v1.UserService
import com.github.alexeysol.geekregimeapiusers.utils.Security
import org.modelmapper.ModelMapper
import org.springframework.stereotype.Component

@Component
class UserDtoMapper(val modelMapper: ModelMapper, val userService: UserService) {
    fun allEntitiesToUserDtos(users: Iterable<User>): List<UserDto> =
        users.map { entityToUserDto(it) }

    fun entityToUserDto(user: User): UserDto =
        modelMapper.map(user, UserDto::class.java)

    fun createUserDtoToEntity(dto: CreateUserDto): User {
        val entity = modelMapper.map(dto, User::class.java)
        entity.details?.setUser(entity)
        return entity
    }

    fun updateUserDtoToEntity(dto: UpdateUserDto, userId: Long): User {
        val entity = userService.findUserById(userId)
            ?: throw ResourceNotFoundException(ApiResource.USER, userId)

        modelMapper.map(dto.details, entity.details)
        modelMapper.map(dto, entity)
        val credentials = entity.credentials

        try {
            checkNotNull(credentials)
            checkNotNull(dto.oldPassword)
            checkNotNull(dto.newPassword)

            if (!passwordIsValid(dto.oldPassword, credentials)) {
                throw ResourceForbiddenException(
                    ApiResource.USER,
                    Pair("oldPassword", DefaultValueConstants.MASKED_VALUE)
                )
            }
        } catch (_: IllegalStateException) {
            // No credentials nor passwords provided, that's fine.
        }

        return entity
    }

    private fun passwordIsValid(password: String, oldCredentials: Credentials): Boolean {
        val newHash = Security.generateHash(password, oldCredentials.salt)
        val oldHash = oldCredentials.hashedPassword
        return newHash.contentEquals(oldHash)
    }
}

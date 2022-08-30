package com.github.alexeysol.geekregimeapiusers.utils.mappers

import com.github.alexeysol.geekregimeapicommons.constants.ApiResource
import com.github.alexeysol.geekregimeapicommons.constants.DefaultValueConstants
import com.github.alexeysol.geekregimeapicommons.exceptions.BaseResourceException
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceForbiddenException
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceNotFoundException
import com.github.alexeysol.geekregimeapicommons.models.Pair
import com.github.alexeysol.geekregimeapiusers.models.dtos.CreateUserDto
import com.github.alexeysol.geekregimeapiusers.models.dtos.UpdateUserDto
import com.github.alexeysol.geekregimeapiusers.models.dtos.UserDto
import com.github.alexeysol.geekregimeapiusers.models.entities.Credentials
import com.github.alexeysol.geekregimeapiusers.models.entities.User
import com.github.alexeysol.geekregimeapiusers.services.v1.UserService
import com.github.alexeysol.geekregimeapiusers.utils.Security
import org.modelmapper.ModelMapper
import org.springframework.stereotype.Component

@Component
class UserMapper(private val modelMapper: ModelMapper, private val userService: UserService) {
    fun fromUserListToUserDtoList(users: Iterable<User>): List<UserDto> =
        users.map { fromUserToUserDto(it) }

    fun fromUserToUserDto(user: User): UserDto =
        modelMapper.map(user, UserDto::class.java)

    fun fromCreateUserDtoToUser(dto: CreateUserDto): User {
        val entity = modelMapper.map(dto, User::class.java)
        entity.details?.setUser(entity)
        return entity
    }

    @Throws(BaseResourceException::class)
    fun fromUpdateUserDtoToUser(dto: UpdateUserDto, userId: Long): User {
        val entity = userService.findUserById(userId)
            ?: throw ResourceNotFoundException(ApiResource.USER, userId)

        modelMapper.map(dto, entity)
        entity.details?.setUser(entity)
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
            // No credentials nor passwords provided, that's fine. Move on.
        }

        return entity
    }

    private fun passwordIsValid(password: String, oldCredentials: Credentials): Boolean {
        val newHash = Security.generateHash(password, oldCredentials.salt)
        val oldHash = oldCredentials.hashedPassword
        return newHash.contentEquals(oldHash)
    }
}

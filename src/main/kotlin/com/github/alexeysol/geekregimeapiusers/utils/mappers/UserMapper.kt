package com.github.alexeysol.geekregimeapiusers.utils.mappers

import com.github.alexeysol.geekregimeapicommons.exceptions.BaseResourceException
import com.github.alexeysol.geekregimeapicommons.models.dtos.UserDto
import com.github.alexeysol.geekregimeapiusers.models.dtos.CreateUserDto
import com.github.alexeysol.geekregimeapiusers.models.dtos.UpdateUserDto
import com.github.alexeysol.geekregimeapiusers.models.entities.User
import org.modelmapper.ModelMapper
import org.springframework.stereotype.Component

@Component
class UserMapper(private val modelMapper: ModelMapper) {
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
    fun fromUpdateUserDtoToUser(dto: UpdateUserDto, user: User): User {
        modelMapper.map(dto, user)
        user.details?.setUser(user)
        return user
    }
}

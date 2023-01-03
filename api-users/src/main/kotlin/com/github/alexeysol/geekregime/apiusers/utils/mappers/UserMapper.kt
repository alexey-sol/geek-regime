package com.github.alexeysol.geekregime.apiusers.utils.mappers

import com.github.alexeysol.geekregime.apicommons.models.dtos.shared.HasIdDto
import com.github.alexeysol.geekregime.apicommons.models.dtos.users.UserDto
import com.github.alexeysol.geekregime.apiusers.models.dtos.CreateUserDto
import com.github.alexeysol.geekregime.apiusers.models.dtos.UpdateUserDto
import com.github.alexeysol.geekregime.apiusers.models.entities.User
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

    fun fromUpdateUserDtoToUser(dto: UpdateUserDto, user: User): User {
        modelMapper.map(dto, user)
        user.details?.setUser(user)
        return user
    }

    fun fromIdToHasIdDto(id: Long): HasIdDto = HasIdDto(id)
}

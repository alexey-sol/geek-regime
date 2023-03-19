package com.github.alexeysol.geekregime.apiusers.utils.mappers

import com.github.alexeysol.geekregime.apicommons.models.dtos.shared.HasIdDto
import com.github.alexeysol.geekregime.apicommons.models.dtos.users.UserDto
import com.github.alexeysol.geekregime.apicommons.utils.Slug
import com.github.alexeysol.geekregime.apiusers.models.dtos.CreateUserDto
import com.github.alexeysol.geekregime.apiusers.models.dtos.UpdateUserDto
import com.github.alexeysol.geekregime.apiusers.models.entities.Credentials
import com.github.alexeysol.geekregime.apiusers.models.entities.User
import com.github.alexeysol.geekregime.apiusers.services.v1.UserService
import com.github.alexeysol.geekregime.apiusers.utils.Security
import org.modelmapper.ModelMapper
import org.springframework.stereotype.Component

const val EMAIL_DELIMITER = "@"

@Component
class UserMapper(
    private val modelMapper: ModelMapper,
    private val service: UserService
) {
    fun fromUserListToUserDtoList(users: Iterable<User>): List<UserDto> =
        users.map { fromUserToUserDto(it) }

    fun fromUserToUserDto(user: User): UserDto =
        modelMapper.map(user, UserDto::class.java)

    fun fromCreateUserDtoToUser(dto: CreateUserDto): User {
        val entity = modelMapper.map(dto, User::class.java)
        entity.slug = generateSlug(dto.email)
        entity.details?.setUser(entity)

        dto.password?.let {
            entity.credentials = createOrUpdateCredentials(dto.password, entity)
        }

        return entity
    }

    fun fromUpdateUserDtoToUser(dto: UpdateUserDto, user: User): User {
        val oldEmail = user.email
        modelMapper.map(dto, user)

        if (dto.email !== null && dto.email !== oldEmail) {
            user.slug = generateSlug(dto.email)
        }

        user.details?.setUser(user)

        dto.newPassword?.let {
            user.credentials = createOrUpdateCredentials(dto.newPassword, user, user.credentials)
        }

        return user
    }

    fun fromIdToHasIdDto(id: Long): HasIdDto = HasIdDto(id)

    private fun generateSlug(email: String): String {
        val username = email.split(EMAIL_DELIMITER)[0]
        var slug = Slug.generateSlug(username)

        if (service.userBySlugExists(slug)) {
            slug += Slug.getSuffix()
        }

        return slug
    }

    private fun createOrUpdateCredentials(
        password: String,
        user: User,
        credentials: Credentials? = null
    ): Credentials {
        val salt = Security.generateSalt()
        val hashedPassword = Security.generateHash(password, salt)

        val result = credentials?.let {
            it.salt = salt
            it.hashedPassword = hashedPassword
            return it
        } ?: Credentials(hashedPassword, salt, user)

        return result
    }
}

package com.github.alexeysol.geekregime.apiusers.mapper

import com.github.alexeysol.geekregime.apicommons.generated.model.CreateUserRequest
import com.github.alexeysol.geekregime.apicommons.generated.model.UpdateUserRequest
import com.github.alexeysol.geekregime.apicommons.generated.model.IdResponse
import com.github.alexeysol.geekregime.apicommons.generated.model.UserResponse
import com.github.alexeysol.geekregime.apicommons.util.Slug
import com.github.alexeysol.geekregime.apiusers.model.entity.Credentials
import com.github.alexeysol.geekregime.apiusers.model.entity.User
import com.github.alexeysol.geekregime.apiusers.service.v1.UserService
import com.github.alexeysol.geekregime.apiusers.util.SecurityUtil
import org.modelmapper.ModelMapper
import org.springframework.stereotype.Component

const val EMAIL_DELIMITER = "@"

@Component
class UserMapper(
    private val modelMapper: ModelMapper,
    private val service: UserService
) {
    fun toUserListResponse(users: Iterable<User>): List<UserResponse> =
        users.map { toUserResponse(it) }

    fun toUserResponse(user: User): UserResponse =
        modelMapper.map(user, UserResponse::class.java)

    fun toUser(request: CreateUserRequest): User {
        val entity = modelMapper.map(request, User::class.java)
        entity.slug = generateSlug(request.email)
        entity.details?.setUser(entity)

        request.password?.let {
            entity.credentials = createOrUpdateCredentials(request.password, entity)
        }

        return entity
    }

    fun toUser(request: UpdateUserRequest, user: User): User {
        val oldEmail = user.email
        modelMapper.map(request, user)

        if (request.email !== null && request.email !== oldEmail) {
            user.slug = generateSlug(request.email)
        }

        user.details?.setUser(user)

        request.newPassword?.let {
            user.credentials = createOrUpdateCredentials(request.newPassword, user, user.credentials)
        }

        return user
    }

    fun toIdResponse(id: Long): IdResponse = IdResponse(id)

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
        val salt = SecurityUtil.generateSalt()
        val hashedPassword = SecurityUtil.generateHash(password, salt)

        val result = credentials?.let {
            it.salt = salt
            it.hashedPassword = hashedPassword
            return it
        } ?: Credentials(hashedPassword, salt, user)

        return result
    }
}

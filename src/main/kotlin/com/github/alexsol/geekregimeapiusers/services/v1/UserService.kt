package com.github.alexsol.geekregimeapiusers.services.v1

import com.github.alexsol.geekregimeapiusers.dtos.CreateUserDto
import com.github.alexsol.geekregimeapiusers.entities.User
import com.github.alexsol.geekregimeapiusers.entities.Details
import com.github.alexsol.geekregimeapiusers.repositories.UserRepository
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.stereotype.Service

@Service
class UserService(
    val db: UserRepository,
    val credentialsService: CredentialsService,
    val detailsService: DetailsService
) {
    fun findAllUsers(): List<User> = db.findAllUsers()

    fun findUserById(id: Int): User? = db.findUserById(id)

    fun createUser(dto: CreateUserDto): User {
        val (user, details, password) = dto
        val createdUser = db.save(user)
        updateRelatedEntitiesIfNeeded(user, details, password)
        return createdUser
    }

    private fun updateRelatedEntitiesIfNeeded(
        user: User,
        details: Details? = null,
        password: String? = null
    ) {
        if (details != null) {
            detailsService.createDetails(Details(
                name = details.name,
                image = details.image,
                user = user,
            ))
        }

        if (password != null) {
            credentialsService.createCredentials(password, user)
        }
    }

    fun removeUserById(id: Int): Int? {
        val removedUserId: Int?

        try {
            removedUserId = db.removeUserById(id)
        } catch (exception: EmptyResultDataAccessException) {
            return null
        }

        return removedUserId
    }
}

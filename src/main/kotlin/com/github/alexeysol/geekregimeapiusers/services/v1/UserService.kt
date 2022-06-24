package com.github.alexeysol.geekregimeapiusers.services.v1

import com.github.alexeysol.geekregimeapiusers.dtos.CreateUserDto
import com.github.alexeysol.geekregimeapiusers.entities.User
import com.github.alexeysol.geekregimeapiusers.repositories.UserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class UserService(
    val db: UserRepository,
    val credentialsService: CredentialsService
) {
    fun findAllUsers(): List<User> = db.findAllUsers()

    fun findUserById(id: Int): User? = db.findByIdOrNull(id)

    @Transactional
    fun createUser(dto: CreateUserDto): User {
        val (user) = dto
        user.details?.setUser(user)

        db.save(user)
        updateAssociationsIfNeeded(dto)
        return user
    }

    private fun updateAssociationsIfNeeded(dto: CreateUserDto) {
        val (user, password) = dto

        password?.let {
            credentialsService.createCredentials(password, user)
        }
    }

    fun removeUserById(id: Int): Int? {
        val deletedRowCount = db.removeUserById(id)
        val userIsDeleted = deletedRowCount > 0
        return if (userIsDeleted) id else null
    }

    fun userAlreadyExists(email: String): Boolean = db.existsUserByEmail(email)
}

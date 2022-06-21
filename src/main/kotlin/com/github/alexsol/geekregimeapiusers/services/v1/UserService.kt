package com.github.alexsol.geekregimeapiusers.services.v1

import com.github.alexsol.geekregimeapiusers.dtos.CreateUserDto
import com.github.alexsol.geekregimeapiusers.entities.User
import com.github.alexsol.geekregimeapiusers.repositories.UserRepository
import org.springframework.stereotype.Service

@Service
class UserService(
    val db: UserRepository,
    val credentialsService: CredentialsService
) {
    fun findAllUsers(): List<User> = db.findAllUsers()

    fun findUserById(id: Int): User? = db.findUserById(id)

    fun createUser(dto: CreateUserDto): User {
        val (user) = dto
        user.details?.user = user

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
}

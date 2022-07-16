package com.github.alexeysol.geekregimeapiusers.services.v1

import com.github.alexeysol.geekregimeapiusers.models.dtos.CreateUserDto
import com.github.alexeysol.geekregimeapiusers.models.entities.User
import com.github.alexeysol.geekregimeapiusers.repositories.UserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class UserService(
    val db: UserRepository,
    val credentialsService: CredentialsService
) {
    fun findAllUsers(): Iterable<User> = db.findAll()

    fun findAllUsersById(ids: List<Long>): Iterable<User> = db.findAllById(ids)

    fun findUserById(id: Long): User? = db.findByIdOrNull(id)

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

    fun removeUserById(id: Long): Long? {
        val deletedRowCount = db.removeUserById(id)
        val userIsDeleted = deletedRowCount > 0
        return if (userIsDeleted) id else -1
    }

    fun userAlreadyExists(email: String): Boolean = db.existsUserByEmail(email)
}

package com.github.alexeysol.geekregimeapiusers.services.v1

import com.github.alexeysol.geekregimeapicommons.constants.DefaultValueConstants
import com.github.alexeysol.geekregimeapiusers.models.entities.User
import com.github.alexeysol.geekregimeapiusers.repositories.UserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class UserService(val db: UserRepository, val credentialsService: CredentialsService) {
    fun findAllUsers(): Iterable<User> = db.findAll()

    fun findAllUsersById(ids: List<Long>): Iterable<User> = db.findAllById(ids)

    fun findUserById(id: Long): User? = db.findByIdOrNull(id)

    @Transactional
    fun createUser(user: User, password: String?): User {
        db.save(user)
        password?.let { credentialsService.createCredentials(password, user) }
        return user
    }

    @Transactional
    fun updateUser(id: Long, user: User, newPassword: String?): User {
        db.save(user)
        newPassword?.let { credentialsService.updateCredentials(newPassword, id, user) }
        return user
    }

    fun removeUserById(id: Long): Long {
        val deletedRowCount = db.removeUserById(id)
        val userIsDeleted = deletedRowCount > 0
        return if (userIsDeleted) id else DefaultValueConstants.NOT_FOUND_BY_ID
    }

    fun userAlreadyExists(email: String): Boolean = db.existsUserByEmail(email)
}

package com.github.alexeysol.geekregimeapiusers.services.v1

import com.github.alexeysol.geekregimeapicommons.constants.DefaultsConstants
import com.github.alexeysol.geekregimeapiusers.models.entities.User
import com.github.alexeysol.geekregimeapiusers.repositories.UserRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class UserService(val repository: UserRepository, val credentialsService: CredentialsService) {
    fun findAllUsers(pageable: Pageable): Page<User> = repository.findAllUsers(pageable)

    fun findAllUsersById(ids: List<Long>, pageable: Pageable): Page<User> =
        repository.findAllUsersById(ids, pageable)

    fun findUserById(id: Long): User? = repository.findUserById(id)

    @Transactional
    fun createUser(user: User, password: String? = null): User {
        repository.save(user)
        password?.let { credentialsService.createCredentials(password, user) }
        return user
    }

    @Transactional
    fun updateUser(id: Long, user: User, newPassword: String? = null): User {
        repository.save(user)
        newPassword?.let { credentialsService.updateCredentials(newPassword, id, user) }
        return user
    }

    fun removeUserById(id: Long): Long {
        val deletedRowCount = repository.removeUserById(id)
        val userIsDeleted = deletedRowCount > 0
        return if (userIsDeleted) id else DefaultsConstants.NOT_FOUND_BY_ID
    }

    fun userAlreadyExists(email: String): Boolean = repository.existsUserByEmail(email)
}

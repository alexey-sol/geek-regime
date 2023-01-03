package com.github.alexeysol.geekregime.apiusers.services.v1

import com.github.alexeysol.geekregime.apiusers.models.entities.Credentials
import com.github.alexeysol.geekregime.apiusers.models.entities.User
import com.github.alexeysol.geekregime.apiusers.repositories.CredentialsRepository
import com.github.alexeysol.geekregime.apiusers.utils.Security
import org.springframework.stereotype.Service

@Service
class CredentialsService(val repository: CredentialsRepository) {
    private fun getCredentials(
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

    fun createCredentials(password: String, user: User): Credentials {
        val credentials = getCredentials(password, user)
        return repository.save(credentials)
    }

    fun updateCredentials(password: String, userId: Long, user: User): Credentials {
        val existingCredentials = repository.findCredentialsByUserId(userId)
        val updatedCredentials = getCredentials(password, user, existingCredentials)
        repository.save(updatedCredentials)
        return updatedCredentials
    }
}

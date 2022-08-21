package com.github.alexeysol.geekregimeapiusers.services.v1

import com.github.alexeysol.geekregimeapiusers.models.entities.Credentials
import com.github.alexeysol.geekregimeapiusers.models.entities.User
import com.github.alexeysol.geekregimeapiusers.repositories.CredentialsRepository
import com.github.alexeysol.geekregimeapiusers.utils.Security
import org.springframework.stereotype.Service

@Service
class CredentialsService(val db: CredentialsRepository) {
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
        return db.save(credentials)
    }

    fun updateCredentials(password: String, userId: Long, user: User): Credentials {
        val existingCredentials = db.findCredentialsByUserId(userId)
        val updatedCredentials = getCredentials(password, user, existingCredentials)
        db.save(updatedCredentials)
        return updatedCredentials
    }
}

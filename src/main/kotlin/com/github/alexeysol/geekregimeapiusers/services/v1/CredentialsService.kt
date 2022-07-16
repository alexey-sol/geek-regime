package com.github.alexeysol.geekregimeapiusers.services.v1

import com.github.alexeysol.geekregimeapiusers.models.entities.Credentials
import com.github.alexeysol.geekregimeapiusers.models.entities.User
import com.github.alexeysol.geekregimeapiusers.repositories.CredentialsRepository
import com.github.alexeysol.geekregimeapiusers.utils.Security
import org.springframework.stereotype.Service

@Service
class CredentialsService(val db: CredentialsRepository) {
    fun createCredentials(password: String, user: User): Credentials {
        val salt = Security.generateSalt()
        val hashedPassword = Security.generateHash(password, salt)
        val credentials = Credentials(hashedPassword, salt, user)
        return db.save(credentials)
    }
}

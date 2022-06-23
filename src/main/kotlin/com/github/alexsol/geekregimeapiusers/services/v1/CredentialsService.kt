package com.github.alexsol.geekregimeapiusers.services.v1

import com.github.alexsol.geekregimeapiusers.entities.Credentials
import com.github.alexsol.geekregimeapiusers.entities.User
import com.github.alexsol.geekregimeapiusers.repositories.CredentialsRepository
import com.github.alexsol.geekregimeapiusers.utils.Security
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

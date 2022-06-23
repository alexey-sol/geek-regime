package com.github.alexsol.geekregimeapiusers.services.v1

import com.github.alexsol.geekregimeapiusers.repositories.CredentialsRepository
import com.github.alexsol.geekregimeapiusers.entities.Credentials
import com.github.alexsol.geekregimeapiusers.entities.User
import com.github.alexsol.geekregimeapiusers.utils.Security
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test

class CredentialsServiceTest {
    private val db: CredentialsRepository = mockk()
    private val service = CredentialsService(db)

    @Test
    fun givenDto_whenCreateCredentials_thenReturnsCredentials() {
        val user = User(id = 1, email = "mark@mail.com")
        val password = "123"
        val salt = Security.generateSalt()
        val hashedPassword = Security.generateHash(password, salt)
        val credentials = Credentials(hashedPassword = hashedPassword, salt = salt)
        every { db.save(credentials) } returns credentials

        val result = service.createCredentials(password, user)

        verify(exactly = 1) { db.save(credentials) }
        Assertions.assertEquals(credentials, result)
    }
}

package com.github.alexeysol.geekregimeapiusers.services.v1

import com.github.alexeysol.geekregimeapiusers.repositories.CredentialsRepository
import com.github.alexeysol.geekregimeapiusers.models.entities.Credentials
import com.github.alexeysol.geekregimeapiusers.models.entities.User
import com.github.alexeysol.geekregimeapiusers.utils.Security
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test

class CredentialsServiceTest {
    private val repository: CredentialsRepository = mockk()
    private val service = CredentialsService(repository)

    @Test
    fun givenDto_whenCreateCredentials_thenReturnsCredentials() {
        val user = User(email = "mark@mail.com")
        val password = "123"
        val salt = Security.generateSalt()
        val hashedPassword = Security.generateHash(password, salt)
        val credentials = Credentials(hashedPassword = hashedPassword, salt = salt)

        every { repository.save(credentials) } returns credentials

        val result = service.createCredentials(password, user)
        verify(exactly = 1) { repository.save(credentials) }
        Assertions.assertEquals(credentials, result)
    }
}

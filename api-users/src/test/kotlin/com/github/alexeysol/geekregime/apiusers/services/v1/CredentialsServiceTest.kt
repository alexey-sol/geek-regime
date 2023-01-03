package com.github.alexeysol.geekregime.apiusers.services.v1

import com.github.alexeysol.geekregime.apiusers.repositories.CredentialsRepository
import com.github.alexeysol.geekregime.apiusers.models.entities.Credentials
import com.github.alexeysol.geekregime.apiusers.models.entities.Details
import com.github.alexeysol.geekregime.apiusers.models.entities.User
import com.github.alexeysol.geekregime.apiusers.utils.Security
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
        val user = User(email = "mark@mail.com", details = Details(name = "Mark"))
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

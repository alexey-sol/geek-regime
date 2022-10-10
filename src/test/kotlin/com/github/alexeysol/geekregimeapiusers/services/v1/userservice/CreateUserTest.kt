package com.github.alexeysol.geekregimeapiusers.services.v1.userservice

import com.github.alexeysol.geekregimeapiusers.models.entities.User
import io.mockk.every
import io.mockk.verify
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions

class CreateUserTest : BaseUserServiceTest() {
    @Test
    fun givenDto_whenCreateUser_thenReturnsUser() {
        val user = User(email = "mark@mail.com")

        every { repository.save(user) } returns user

        val result = service.createUser(user)
        verify(exactly = 1) { repository.save(user) }
        Assertions.assertEquals(user, result)
    }
}

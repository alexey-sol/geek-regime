package com.github.alexeysol.geekregime.apiusers.service.v1.userservice

import com.github.alexeysol.geekregime.apiusers.model.entity.User
import io.mockk.every
import io.mockk.verify
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions

class CreateUserTest : BaseUserServiceTest() {
    @Test
    fun givenEntity_whenCreateUser_thenReturnsUser() {
        val user = User(email = "mark@mail.com", details = defaultDetails)

        every { repository.save(user) } returns user

        val result = service.saveUser(user)
        verify(exactly = 1) { repository.save(user) }
        Assertions.assertEquals(user, result)
    }
}

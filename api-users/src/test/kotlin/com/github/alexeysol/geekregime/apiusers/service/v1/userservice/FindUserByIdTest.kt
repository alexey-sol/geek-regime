package com.github.alexeysol.geekregime.apiusers.service.v1.userservice

import com.github.alexeysol.geekregime.apiusers.model.entity.User
import io.mockk.every
import io.mockk.verify
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions

class FindUserByIdTest : BaseUserServiceTest() {
    @Test
    fun givenUserExists_whenFindUserById_thenReturnsUser() {
        val userId = 1L
        val user = User(email = "mark@mail.com", details = defaultDetails)

        every { repository.findUserById(userId) } returns user

        val result = service.findUserById(userId)
        verify(exactly = 1) { repository.findUserById(userId) }
        Assertions.assertEquals(user, result)
    }

    @Test
    fun givenUserDoesntExist_whenFindUserById_thenReturnsNull() {
        val absentUserId = 10L

        every { repository.findUserById(absentUserId) } returns null

        val result = service.findUserById(absentUserId)
        verify(exactly = 1) { repository.findUserById(absentUserId) }
        Assertions.assertEquals(null, result)
    }
}

package com.github.alexeysol.geekregimeapiusers.services.v1.userservice

import com.github.alexeysol.geekregimeapiusers.models.entities.User
import io.mockk.every
import io.mockk.verify
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions

class FindUserByIdTest : BaseUserServiceTest() {
    @Test
    fun givenUserExist_whenFindUserById_thenReturnsUser() {
        val userId = 1L
        val user = User(email = "mark@mail.com")

        every { userRepository.findUserById(userId) } returns user

        val result = userService.findUserById(userId)
        verify(exactly = 1) { userRepository.findUserById(userId) }
        Assertions.assertEquals(user, result)
    }

    @Test
    fun givenUserDoesntExist_whenFindUserById_thenReturnsNull() {
        val absentUserId = 10L

        every { userRepository.findUserById(absentUserId) } returns null

        val result = userService.findUserById(absentUserId)
        verify(exactly = 1) { userRepository.findUserById(absentUserId) }
        Assertions.assertEquals(null, result)
    }
}

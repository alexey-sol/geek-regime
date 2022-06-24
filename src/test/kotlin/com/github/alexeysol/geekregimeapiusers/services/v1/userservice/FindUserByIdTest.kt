package com.github.alexeysol.geekregimeapiusers.services.v1.userservice

import com.github.alexeysol.geekregimeapiusers.entities.User
import io.mockk.every
import io.mockk.verify
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions
import org.springframework.data.repository.findByIdOrNull

class FindUserByIdTest : BaseUserServiceTest() {
    @Test
    fun givenUserExist_whenFindUserById_thenReturnsUser() {
        val userId = 1
        val user = User(id = userId, email = "mark@mail.com")
        every { userRepository.findByIdOrNull(userId) } returns user

        val result = userService.findUserById(userId)

        verify(exactly = 1) { userRepository.findByIdOrNull(userId) }
        Assertions.assertEquals(user, result)
    }

    @Test
    fun givenUserDoesntExist_whenFindUserById_thenReturnsNull() {
        val absentUserId = 10
        every { userRepository.findByIdOrNull(absentUserId) } returns null

        val result = userService.findUserById(absentUserId)

        verify(exactly = 1) { userRepository.findByIdOrNull(absentUserId) }
        Assertions.assertEquals(null, result)
    }
}

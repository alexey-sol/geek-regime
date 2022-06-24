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
        val initialUserId = 1
        val user = User(email = "mark@mail.com")
        every { userRepository.findByIdOrNull(initialUserId) } returns user

        val result = userService.findUserById(initialUserId)

        verify(exactly = 1) { userRepository.findByIdOrNull(initialUserId) }
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

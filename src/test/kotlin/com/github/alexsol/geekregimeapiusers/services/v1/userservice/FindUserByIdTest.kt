package com.github.alexsol.geekregimeapiusers.services.v1.userservice

import com.github.alexsol.geekregimeapiusers.entities.User
import io.mockk.every
import io.mockk.verify
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions

class FindUserByIdTest : BaseUserServiceTest() {
    @Test
    fun givenUserExist_whenFindUserById_thenReturnsUser() {
        val userId = 1
        val user = User(id = userId, email = "mark@mail.com")
        every { userRepository.findUserById(userId) } returns user

        val result = userService.findUserById(userId)

        verify(exactly = 1) { userRepository.findUserById(userId) }
        Assertions.assertEquals(user, result)
    }

    @Test
    fun givenUserDoesntExist_whenFindUserById_thenReturnsNull() {
        val nullUserId = 10
        every { userRepository.findUserById(nullUserId) } returns null

        val result = userService.findUserById(nullUserId)

        verify(exactly = 1) { userRepository.findUserById(nullUserId) }
        Assertions.assertEquals(null, result)
    }
}

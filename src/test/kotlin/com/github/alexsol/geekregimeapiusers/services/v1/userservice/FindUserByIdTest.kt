package com.github.alexsol.geekregimeapiusers.services.v1.userservice

import com.github.alexsol.geekregimeapiusers.entities.User
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
        val nullUserId = 10
        every { userRepository.findByIdOrNull(nullUserId) } returns null

        val result = userService.findUserById(nullUserId)

        verify(exactly = 1) { userRepository.findByIdOrNull(nullUserId) }
        Assertions.assertEquals(null, result)
    }
}

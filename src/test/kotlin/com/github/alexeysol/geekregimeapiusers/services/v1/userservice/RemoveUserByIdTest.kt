package com.github.alexeysol.geekregimeapiusers.services.v1.userservice

import io.mockk.every
import io.mockk.verify
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions

class RemoveUserByIdTest : BaseUserServiceTest() {
    @Test
    fun givenUserExists_whenRemoveUserById_thenReturnsUserId() {
        val userId = 3
        val deletedRowCount = 1
        every { userRepository.removeUserById(userId) } returns deletedRowCount

        val result = userService.removeUserById(userId)

        verify(exactly = 1) { userRepository.removeUserById(userId) }
        Assertions.assertEquals(userId, result)
    }

    @Test
    fun givenUserDoesntExist_whenRemoveUserById_thenReturnsNull() {
        val absentUserId = 10
        val deletedRowCount = 0
        every { userRepository.removeUserById(absentUserId) } returns deletedRowCount

        val result = userService.removeUserById(absentUserId)

        verify(exactly = 1) { userRepository.removeUserById(absentUserId) }
        Assertions.assertEquals(null, result)
    }
}

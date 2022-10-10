package com.github.alexeysol.geekregimeapiusers.services.v1.userservice

import com.github.alexeysol.geekregimeapicommons.constants.DefaultsConstants
import io.mockk.every
import io.mockk.verify
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions

class RemoveUserByIdTest : BaseUserServiceTest() {
    @Test
    fun givenUserExists_whenRemoveUserById_thenReturnsUserId() {
        val userId = 3L
        val deletedRowCount = 1

        every { repository.removeUserById(userId) } returns deletedRowCount

        val result = service.removeUserById(userId)
        verify(exactly = 1) { repository.removeUserById(userId) }
        Assertions.assertEquals(userId, result)
    }

    @Test
    fun givenUserDoesntExist_whenRemoveUserById_thenReturnsOutOfRange() {
        val absentUserId = 10L
        val deletedRowCount = 0

        every { repository.removeUserById(absentUserId) } returns deletedRowCount

        val result = service.removeUserById(absentUserId)
        verify(exactly = 1) { repository.removeUserById(absentUserId) }
        Assertions.assertEquals(DefaultsConstants.NOT_FOUND_BY_ID, result)
    }
}

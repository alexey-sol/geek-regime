package com.github.alexeysol.geekregimeapiusers.services.v1.userservice

import com.github.alexeysol.geekregimeapiusers.models.entities.User
import io.mockk.every
import io.mockk.verify
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions

class FindAllUsersByIdTest : BaseUserServiceTest() {
    private val initialId1 = 1L
    private val initialId2 = 2L
    private val user1 = User(id = initialId1, email = "mark@mail.com")
    private val user2 = User(id = initialId2, email = "boobuntu@mail.com")

    @Test
    fun usersExist_whenFindAllUsersById_thenReturnsUserList() {
        val users = listOf(user1, user2)
        val userIds = listOf(initialId1, initialId2)
        every { userRepository.findAllById(userIds) } returns users

        val result = userService.findAllUsersById(userIds)

        verify(exactly = 1) { userRepository.findAllById(userIds) }
        Assertions.assertEquals(users, result)
    }

    @Test
    fun usersDontExist_whenFindAllUsersById_thenReturnsEmptyList() {
        val absentId1 = 10L
        val absentId2 = 11L
        val emptyList = listOf<User>()
        val userIds = listOf(absentId1, absentId2)
        every { userRepository.findAllById(userIds) } returns emptyList

        val result = userService.findAllUsersById(userIds)

        verify(exactly = 1) { userRepository.findAllById(userIds) }
        Assertions.assertEquals(emptyList, result)
    }
}

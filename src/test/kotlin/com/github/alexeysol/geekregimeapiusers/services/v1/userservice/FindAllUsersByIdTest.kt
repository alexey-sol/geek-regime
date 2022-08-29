package com.github.alexeysol.geekregimeapiusers.services.v1.userservice

import com.github.alexeysol.geekregimeapiusers.models.entities.User
import io.mockk.every
import io.mockk.verify
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl

class FindAllUsersByIdTest : BaseUserServiceTest() {
    @Test
    fun usersExist_whenFindAllUsersById_thenReturnsUserList() {
        val userId = 1L
        val userId2 = 2L
        val userIds = listOf(userId, userId2)

        val users = listOf(User(id = userId), User(id = userId2))
        val userPage: Page<User> = PageImpl(users, pageableStub, users.size.toLong())

        every { userRepository.findAllUsersById(userIds, pageableStub) } returns userPage

        val result = userService.findAllUsersById(userIds, pageableStub)
        verify(exactly = 1) { userRepository.findAllUsersById(userIds, pageableStub) }
        Assertions.assertEquals(userPage, result)
    }

    @Test
    fun usersDontExist_whenFindAllUsersById_thenReturnsEmptyList() {
        val absentId = 10L
        val absentId2 = 11L
        val userIds = listOf(absentId, absentId2)

        val emptyUserPage: Page<User> = PageImpl(listOf(), pageableStub, 0)

        every { userRepository.findAllUsersById(userIds, pageableStub) } returns emptyUserPage

        val result = userService.findAllUsersById(userIds, pageableStub)
        verify(exactly = 1) { userRepository.findAllUsersById(userIds, pageableStub) }
        Assertions.assertEquals(emptyUserPage, result)
    }
}

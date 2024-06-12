package com.github.alexeysol.geekregime.apiusers.service.v1.userservice

import com.github.alexeysol.geekregime.apiusers.model.entity.User
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

        val users = listOf(
            User(id = userId, details = defaultDetails),
            User(id = userId2, details = defaultDetails)
        )
        val userPage: Page<User> = PageImpl(users, pageableStub, users.size.toLong())

        every { repository.findAllUsersById(userIds, pageableStub) } returns userPage

        val result = service.findAllUsersById(userIds, pageableStub)
        verify(exactly = 1) { repository.findAllUsersById(userIds, pageableStub) }
        Assertions.assertEquals(userPage, result)
    }

    @Test
    fun usersDontExist_whenFindAllUsersById_thenReturnsEmptyList() {
        val absentId = 10L
        val absentId2 = 11L
        val userIds = listOf(absentId, absentId2)

        val emptyUserPage: Page<User> = PageImpl(listOf(), pageableStub, 0)

        every { repository.findAllUsersById(userIds, pageableStub) } returns emptyUserPage

        val result = service.findAllUsersById(userIds, pageableStub)
        verify(exactly = 1) { repository.findAllUsersById(userIds, pageableStub) }
        Assertions.assertEquals(emptyUserPage, result)
    }
}

package com.github.alexeysol.geekregimeapiusers.services.v1.userservice

import com.github.alexeysol.geekregimeapiusers.models.entities.User
import io.mockk.every
import io.mockk.verify
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl

class FindAllUsersTest : BaseUserServiceTest() {
    @Test
    fun usersExist_whenFindAllUsers_thenReturnsUserList() {
        val users = listOf(
            User(details = defaultDetails),
            User(details = defaultDetails)
        )
        val userPage: Page<User> = PageImpl(users, pageableStub, users.size.toLong())

        every { repository.findAllUsers(pageableStub) } returns userPage

        val result = service.findAllUsers(pageableStub)
        verify(exactly = 1) { repository.findAllUsers(pageableStub) }
        Assertions.assertEquals(userPage, result)
    }

    @Test
    fun usersDontExist_whenFindAllUsers_thenReturnsEmptyList() {
        val emptyUserPage: Page<User> = PageImpl(listOf(), pageableStub, 0)

        every { repository.findAllUsers(pageableStub) } returns emptyUserPage

        val result = service.findAllUsers(pageableStub)
        verify(exactly = 1) { repository.findAllUsers(pageableStub) }
        Assertions.assertEquals(emptyUserPage, result)
    }
}

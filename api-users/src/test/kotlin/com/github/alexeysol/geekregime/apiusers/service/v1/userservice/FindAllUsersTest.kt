package com.github.alexeysol.geekregime.apiusers.service.v1.userservice

import com.github.alexeysol.geekregime.apiusers.model.entity.User
import io.mockk.every
import io.mockk.verify
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl

class FindAllUsersTest : BaseUserServiceTest() {
    @Test
    fun usersExist_whenFindAllUsers_thenReturnsUserPage() {
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
    fun usersDontExist_whenFindAllUsers_thenReturnsEmptyPage() {
        val emptyUserPage: Page<User> = PageImpl(listOf(), pageableStub, 0)

        every { repository.findAllUsers(pageableStub) } returns emptyUserPage

        val result = service.findAllUsers(pageableStub)
        verify(exactly = 1) { repository.findAllUsers(pageableStub) }
        Assertions.assertEquals(emptyUserPage, result)
    }
}

package com.github.alexeysol.geekregimeapiusers.services.v1.userservice

import com.github.alexeysol.geekregimeapiusers.models.entities.User
import io.mockk.every
import io.mockk.verify
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions

class FindAllUsersTest : BaseUserServiceTest() {
    private val user1 = User(email = "mark@mail.com")
    private val user2 = User(email = "boobuntu@mail.com")

    @Test
    fun usersExist_whenFindAllUsers_thenReturnsUserList() {
        val users = listOf(user1, user2)
        every { userRepository.findAll() } returns users

        val result = userService.findAllUsers()

        verify(exactly = 1) { userRepository.findAll() }
        Assertions.assertEquals(users, result)
    }

    @Test
    fun usersDontExist_whenFindAllUsers_thenReturnsEmptyList() {
        val emptyList = listOf<User>()
        every { userRepository.findAll() } returns emptyList

        val result = userService.findAllUsers()

        verify(exactly = 1) { userRepository.findAll() }
        Assertions.assertEquals(emptyList, result)
    }
}

package com.github.alexeysol.geekregimeapiusers.services.v1.userservice

import com.github.alexeysol.geekregimeapiusers.entities.User
import io.mockk.every
import io.mockk.verify
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions

class FindAllUsersTest : BaseUserServiceTest() {
    @Test
    fun usersExist_whenFindAllUsers_thenReturnsUserList() {
        val user1 = User(id = 1, email = "mark@mail.com")
        val user2 = User(id = 2, email = "boobuntu@mail.com")
        val users = listOf(user1, user2)
        every { userRepository.findAllUsers() } returns users

        val result = userService.findAllUsers()

        verify(exactly = 1) { userRepository.findAllUsers() }
        Assertions.assertEquals(users, result)
    }

    @Test
    fun usersDontExist_whenFindAllUsers_thenReturnsEmptyList() {
        val emptyList = listOf<User>()
        every { userRepository.findAllUsers() } returns emptyList

        val result = userService.findAllUsers()

        verify(exactly = 1) { userRepository.findAllUsers() }
        Assertions.assertEquals(emptyList, result)
    }
}

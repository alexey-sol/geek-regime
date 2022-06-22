package com.github.alexsol.geekregimeapiusers.services.v1

import com.github.alexsol.geekregimeapiusers.entities.User
import com.github.alexsol.geekregimeapiusers.repositories.CredentialsRepository
import com.github.alexsol.geekregimeapiusers.repositories.UserRepository
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions

class UserServiceTest {
    private val userRepository: UserRepository = mockk()
    private val credentialsRepository: CredentialsRepository = mockk()

    private val credentialsService = CredentialsService(credentialsRepository)
    private val userService = UserService(userRepository, credentialsService)

    @Test
    fun usersExist_whenFindAllUsers_thenReturnUserList() {
        val user1 = User(id = 1, email = "mark@mail.com")
        val user2 = User(id = 2, email = "boobuntu@mail.com")
        val users = listOf(user1, user2)
        every { userRepository.findAllUsers() } returns users

        val result = userService.findAllUsers()

        verify(exactly = 1) { userRepository.findAllUsers() }
        Assertions.assertEquals(users, result)
    }

    @Test
    fun usersDontExist_whenFindAllUsers_thenReturnEmptyList() {
        val emptyList = listOf<User>()
        every { userRepository.findAllUsers() } returns emptyList

        val result = userService.findAllUsers()

        verify(exactly = 1) { userRepository.findAllUsers() }
        Assertions.assertEquals(emptyList, result)
    }

    @Test
    fun givenUserExist_whenFindUserById_thenReturnUser() {
        val user = User(id = 1, email = "mark@mail.com")
        every { userRepository.findUserById(user.id) } returns user

        val result = userService.findUserById(user.id)

        verify(exactly = 1) { userRepository.findUserById(user.id) }
        Assertions.assertEquals(user, result)
    }

    @Test
    fun givenUserDoesntExist_whenFindUserById_thenReturnNull() {
        val nullUserId = 10
        every { userRepository.findUserById(nullUserId) } returns null

        val result = userService.findUserById(nullUserId)

        verify(exactly = 1) { userRepository.findUserById(nullUserId) }
        Assertions.assertEquals(null, result)
    }
}

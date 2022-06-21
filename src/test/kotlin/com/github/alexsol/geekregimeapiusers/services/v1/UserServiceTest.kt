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
    fun givenExistingUser_whenFindUserById_thenReturnUser() {
        val user = User(id = 1, email = "mark@mail.com")
        every { userRepository.findUserById(1) } returns user

        val result = userService.findUserById(1)

        verify(exactly = 1) { userRepository.findUserById(1) }
        Assertions.assertEquals(user, result)
    }

    @Test
    fun givenUserDoesntExist_whenFindUserById_thenReturnNull() {
        every { userRepository.findUserById(10) } returns null

        val result = userService.findUserById(10)

        verify(exactly = 1) { userRepository.findUserById(10) }
        Assertions.assertEquals(null, result)
    }
}

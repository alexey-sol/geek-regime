package com.github.alexsol.geekregimeapiusers.services.v1.userservice

import com.github.alexsol.geekregimeapiusers.dtos.CreateUserDto
import com.github.alexsol.geekregimeapiusers.entities.User
import io.mockk.every
import io.mockk.verify
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions

class CreateUserTest : BaseUserServiceTest() {
    @Test
    fun givenDto_whenCreateUser_thenReturnsUser() {
        val user = User(id = 1, email = "mark@mail.com")
        val dto = CreateUserDto(user)
        every { userRepository.save(user) } returns user

        val result = userService.createUser(dto)

        verify(exactly = 1) { userRepository.save(user) }
        Assertions.assertEquals(user, result)
    }
}

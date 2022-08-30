package com.github.alexeysol.geekregimeapiusers.utils.mappers

import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceForbiddenException
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceNotFoundException
import com.github.alexeysol.geekregimeapiusers.models.dtos.CreateOrUpdateDetailsDto
import com.github.alexeysol.geekregimeapiusers.models.dtos.CreateUserDto
import com.github.alexeysol.geekregimeapiusers.models.dtos.UpdateUserDto
import com.github.alexeysol.geekregimeapiusers.models.entities.Credentials
import com.github.alexeysol.geekregimeapiusers.models.entities.Details
import com.github.alexeysol.geekregimeapiusers.models.entities.User
import com.github.alexeysol.geekregimeapiusers.services.v1.UserService
import com.ninjasquad.springmockk.MockkBean
import io.mockk.every
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class UserMapperTest(@Autowired val userMapper: UserMapper) {
    @MockkBean
    lateinit var userService: UserService

    @Test
    fun givenValidUsers_whenFromUserListToUserDtoList_thenReturnsUserDtoList() {
        val email = "mark@mail.com"
        val email2 = "boobuntu@mail.com"
        val users = listOf(User(email = email), User(email = email2))

        val result = userMapper.fromUserListToUserDtoList(users)
        Assertions.assertEquals(users.size, result.size)
        Assertions.assertEquals(email, result[0].email)
        Assertions.assertEquals(email2, result[1].email)
    }

    @Test
    fun givenValidUser_whenFromUserToUserDto_thenReturnsUserDto() {
        val email = "mark@mail.com"
        val name = "Mark"
        val user = User(email = email, details = Details(name = name))

        val result = userMapper.fromUserToUserDto(user)
        Assertions.assertEquals(email, result.email)
        Assertions.assertEquals(name, result.details?.name)
    }

    @Test
    fun givenValidDto_whenFromCreateUserDtoToUser_thenReturnsUser() {
        val email = "mark@mail.com"
        val name = "Mark"
        val password = "123"
        val createUserDto = CreateUserDto(
            email = email,
            password = password,
            details = CreateOrUpdateDetailsDto(name = name)
        )

        val result = userMapper.fromCreateUserDtoToUser(createUserDto)
        Assertions.assertEquals(email, result.email)
        Assertions.assertEquals(name, result.details?.name)
    }

    @Test
    fun givenValidDto_whenFromUpdateUserDtoToUser_thenReturnsUpdatedUser() {
        val userId = 1L
        val email = "mark@mail.com"
        val oldName = "Mark"
        val newName = "Oh Hi Mark"
        val updateUserDto = UpdateUserDto(
            email = email,
            details = CreateOrUpdateDetailsDto(name = newName)
        )
        val user = User(email = email, details = Details(name = oldName))

        every { userService.findUserById(userId) } returns user

        val result = userMapper.fromUpdateUserDtoToUser(updateUserDto, userId)
        Assertions.assertEquals(email, result.email)
        Assertions.assertEquals(newName, result.details?.name)
    }

    @Test
    fun givenDtoIsForAbsentUser_whenFromUpdateUserDtoToUser_thenThrowsResourceNotFoundException() {
        val absentUserId = 10L
        val email = "mark@mail.com"
        val updateUserDto = UpdateUserDto(email = email)

        every { userService.findUserById(absentUserId) } returns null

        Assertions.assertThrows(ResourceNotFoundException::class.java) {
            userMapper.fromUpdateUserDtoToUser(updateUserDto, absentUserId)
        }
    }

    @Test
    fun givenDtoHasInvalidOldPassword_whenFromUpdateUserDtoToUser_thenThrowsResourceForbiddenException() {
        val userId = 1L
        val email = "mark@mail.com"
        val name = "Mark"
        val invalidOldPassword = "???"
        val details = Details(name = name)
        val credentials = Credentials(
            userId = userId,
            hashedPassword = ByteArray(1),
            salt = ByteArray(2)
        )
        val updateUserDto = UpdateUserDto(
            email = email,
            oldPassword = invalidOldPassword,
            newPassword = "1234"
        )
        val user = User(email = email, details = details, credentials = credentials)

        every { userService.findUserById(userId) } returns user

        Assertions.assertThrows(ResourceForbiddenException::class.java) {
            userMapper.fromUpdateUserDtoToUser(updateUserDto, userId)
        }
    }

    @Test
    fun givenDtoHasDetailsButEntityDoesnt_whenFromUpdateUserDtoToUser_thenReturnsUpdatedUser() {
        val userId = 1L
        val oldEmail = "mark@mail.com"
        val newEmail = "oh.hi.mark@mail.com"
        val newName = "Oh Hi Mark"
        val updateUserDto = UpdateUserDto(
            email = newEmail,
            details = CreateOrUpdateDetailsDto(name = newName)
        )
        val user = User(email = oldEmail)

        every { userService.findUserById(userId) } returns user

        val result = userMapper.fromUpdateUserDtoToUser(updateUserDto, userId)
        Assertions.assertEquals(newEmail, result.email)
        Assertions.assertEquals(newName, result.details?.name)
    }

    @Test
    fun givenDtoHasNulls_whenFromUpdateUserDtoToUser_thenReturnsUserWithNotAppliedNulls() {
        val userId = 1L
        val oldEmail = "mark@mail.com"
        val newEmail = null
        val oldName = "Mark"
        val newName = null
        val updateUserDto = UpdateUserDto(
            email = newEmail,
            details = CreateOrUpdateDetailsDto(name = newName)
        )
        val user = User(
            email = oldEmail,
            details = Details(name = oldName)
        )

        every { userService.findUserById(userId) } returns user

        val result = userMapper.fromUpdateUserDtoToUser(updateUserDto, userId)
        Assertions.assertEquals(oldEmail, result.email)
        Assertions.assertEquals(oldName, result.details?.name)
    }
}

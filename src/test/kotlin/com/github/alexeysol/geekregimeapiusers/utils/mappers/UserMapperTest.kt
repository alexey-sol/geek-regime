package com.github.alexeysol.geekregimeapiusers.utils.mappers

import com.github.alexeysol.geekregimeapiusers.models.dtos.CreateOrUpdateDetailsDto
import com.github.alexeysol.geekregimeapiusers.models.dtos.CreateUserDto
import com.github.alexeysol.geekregimeapiusers.models.dtos.UpdateUserDto
import com.github.alexeysol.geekregimeapiusers.models.entities.Details
import com.github.alexeysol.geekregimeapiusers.models.entities.User
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class UserMapperTest(@Autowired val mapper: UserMapper) {
    @Test
    fun givenValidUsers_whenFromUserListToUserDtoList_thenReturnsUserDtoList() {
        val email = "mark@mail.com"
        val email2 = "boobuntu@mail.com"
        val users = listOf(User(email = email), User(email = email2))

        val result = mapper.fromUserListToUserDtoList(users)
        Assertions.assertEquals(users.size, result.size)
        Assertions.assertEquals(email, result[0].email)
        Assertions.assertEquals(email2, result[1].email)
    }

    @Test
    fun givenValidUser_whenFromUserToUserDto_thenReturnsUserDto() {
        val email = "mark@mail.com"
        val name = "Mark"
        val user = User(email = email, details = Details(name = name))

        val result = mapper.fromUserToUserDto(user)
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

        val result = mapper.fromCreateUserDtoToUser(createUserDto)
        Assertions.assertEquals(email, result.email)
        Assertions.assertEquals(name, result.details?.name)
    }

    @Test
    fun givenValidDto_whenFromUpdateUserDtoToUser_thenReturnsUpdatedUser() {
        val email = "mark@mail.com"
        val oldName = "Mark"
        val newName = "Oh Hi Mark"
        val updateUserDto = UpdateUserDto(
            email = email,
            details = CreateOrUpdateDetailsDto(name = newName)
        )
        val user = User(email = email, details = Details(name = oldName))

        val result = mapper.fromUpdateUserDtoToUser(updateUserDto, user)
        Assertions.assertEquals(email, result.email)
        Assertions.assertEquals(newName, result.details?.name)
    }

    @Test
    fun givenDtoHasDetailsButEntityDoesnt_whenFromUpdateUserDtoToUser_thenReturnsUpdatedUser() {
        val oldEmail = "mark@mail.com"
        val newEmail = "oh.hi.mark@mail.com"
        val newName = "Oh Hi Mark"
        val updateUserDto = UpdateUserDto(
            email = newEmail,
            details = CreateOrUpdateDetailsDto(name = newName)
        )
        val user = User(email = oldEmail)

        val result = mapper.fromUpdateUserDtoToUser(updateUserDto, user)
        Assertions.assertEquals(newEmail, result.email)
        Assertions.assertEquals(newName, result.details?.name)
    }

    @Test
    fun givenDtoHasNulls_whenFromUpdateUserDtoToUser_thenReturnsUserWithNotAppliedNulls() {
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

        val result = mapper.fromUpdateUserDtoToUser(updateUserDto, user)
        Assertions.assertEquals(oldEmail, result.email)
        Assertions.assertEquals(oldName, result.details?.name)
    }

    @Test
    fun whenFromIdToDeletionResultDto_thenReturnsDto() {
        val userId = 1L

        val result = mapper.fromIdToDeletionResultDto(userId)
        Assertions.assertEquals(userId, result.id)
    }
}

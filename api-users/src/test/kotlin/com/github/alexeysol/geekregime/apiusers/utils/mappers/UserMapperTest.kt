package com.github.alexeysol.geekregime.apiusers.utils.mappers

import com.github.alexeysol.geekregime.apiusers.models.dtos.*
import com.github.alexeysol.geekregime.apiusers.models.entities.Details
import com.github.alexeysol.geekregime.apiusers.models.entities.User
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
        val user = User(email = email, details = Details(name = "Boe"))
        val user2 = User(email = email2, details = Details(name = "Moe"))
        val users = listOf(user, user2)

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
            details = CreateDetailsDto(name = name)
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
            details = UpdateDetailsDto(name = newName)
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
        val oldName = "Boe"
        val newName = "Oh Hi Mark"
        val updateUserDto = UpdateUserDto(
            email = newEmail,
            details = UpdateDetailsDto(name = newName)
        )
        val user = User(
            email = oldEmail,
            details = Details(name = oldName)
        )

        val result = mapper.fromUpdateUserDtoToUser(updateUserDto, user)
        Assertions.assertEquals(newEmail, result.email)
        Assertions.assertEquals(newName, result.details?.name)
    }

    @Test
    fun givenDtoHasNulls_whenFromUpdateUserDtoToUser_thenReturnsUserWithSkippedNulls() {
        val oldEmail = "mark@mail.com"
        val newEmail = null
        val oldName = "Mark"
        val newName = null
        val updateUserDto = UpdateUserDto(
            email = newEmail,
            details = UpdateDetailsDto(name = newName)
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
    fun whenFromIdToBaseMutationResultDto_thenReturnsDto() {
        val userId = 1L

        val result = mapper.fromIdToHasIdDto(userId)
        Assertions.assertEquals(userId, result.id)
    }
}

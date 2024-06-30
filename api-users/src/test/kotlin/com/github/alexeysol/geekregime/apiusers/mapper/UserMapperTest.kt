package com.github.alexeysol.geekregime.apiusers.mapper

import com.github.alexeysol.geekregime.apiusers.generated.model.CreateUserRequest
import com.github.alexeysol.geekregime.apiusers.generated.model.CreateUserRequestDetails
import com.github.alexeysol.geekregime.apiusers.generated.model.UpdateUserRequest
import com.github.alexeysol.geekregime.apiusers.generated.model.UpdateUserRequestDetails
import com.github.alexeysol.geekregime.apiusers.model.entity.Details
import com.github.alexeysol.geekregime.apiusers.model.entity.User
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class UserMapperTest(@Autowired val mapper: UserMapper) {
    @Test
    fun givenValidUsers_whenToUserListResponse_thenReturnsUserResponseList() {
        val email = "mark@mail.com"
        val email2 = "boobuntu@mail.com"
        val user = User(email = email, details = Details(name = "Boe"))
        val user2 = User(email = email2, details = Details(name = "Moe"))
        val users = listOf(user, user2)

        val result = mapper.toUserListResponse(users)
        Assertions.assertEquals(users.size, result.size)
        Assertions.assertEquals(email, result[0].email)
        Assertions.assertEquals(email2, result[1].email)
    }

    @Test
    fun givenValidUser_whenToUserResponse_thenReturnsUserResponse() {
        val email = "mark@mail.com"
        val name = "Mark"
        val user = User(email = email, details = Details(name = name))

        val result = mapper.toUserResponse(user)
        Assertions.assertEquals(email, result.email)
        Assertions.assertEquals(name, result.details?.name)
    }

    @Test
    fun givenValidCreateUserRequest_whenToUser_thenReturnsUser() {
        val email = "mark@mail.com"
        val name = "Mark"
        val password = "123"
        val createUserRequest = CreateUserRequest.builder()
            .email(email)
            .password(password)
            .details(CreateUserRequestDetails.builder()
                .name(name)
                .build())
            .build()

        val result = mapper.toUser(createUserRequest)
        Assertions.assertEquals(email, result.email)
        Assertions.assertEquals(name, result.details?.name)
    }

    @Test
    fun givenValidUpdateUserRequest_whenToUser_thenReturnsUpdatedUser() {
        val email = "mark@mail.com"
        val oldName = "Mark"
        val newName = "Oh Hi Mark"
        val updateUserRequest = UpdateUserRequest.builder()
            .email(email)
            .details(UpdateUserRequestDetails.builder()
                .name(newName).build())
            .build()
        val user = User(email = email, details = Details(name = oldName))

        val result = mapper.toUser(updateUserRequest, user)
        Assertions.assertEquals(email, result.email)
        Assertions.assertEquals(newName, result.details?.name)
    }

    @Test
    fun givenNulls_whenToUser_thenReturnsUserWithSkippedNulls() {
        val oldEmail = "mark@mail.com"
        val newEmail = null
        val oldName = "Mark"
        val newName = null
        val updateUserRequest = UpdateUserRequest.builder()
            .email(newEmail)
            .details(UpdateUserRequestDetails.builder()
                .name(newName)
                .build())
            .build()
        val user = User(
            email = oldEmail,
            details = Details(name = oldName)
        )

        val result = mapper.toUser(updateUserRequest, user)
        Assertions.assertEquals(oldEmail, result.email)
        Assertions.assertEquals(oldName, result.details?.name)
    }

    @Test
    fun whenToIdResponse_thenReturnsIdResponse() {
        val userId = 1L

        val result = mapper.toIdResponse(userId)
        Assertions.assertEquals(userId, result.id)
    }
}

package com.github.alexeysol.geekregime.apiusers.controller.v1.usercontroller

import com.github.alexeysol.geekregime.apicommons.exception.ResourceException
import com.github.alexeysol.geekregime.apicommons.generated.model.UserResponse
import com.github.alexeysol.geekregime.apicommons.util.TestUtil
import com.github.alexeysol.geekregime.apicommons.util.parser.Json
import com.github.alexeysol.geekregime.apiusers.generated.model.UpdateUserRequest
import com.github.alexeysol.geekregime.apiusers.model.entity.Credentials
import com.github.alexeysol.geekregime.apiusers.model.entity.Details
import com.github.alexeysol.geekregime.apiusers.model.entity.User
import io.mockk.every
import org.hamcrest.CoreMatchers
import org.hamcrest.MatcherAssert
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.web.bind.MethodArgumentNotValidException
import java.util.*

class UpdateUserTest(@Autowired mockMvc: MockMvc) : BaseUserControllerTest(mockMvc) {
    @Test
    fun givenRequestIsValid_whenUpdateUser_thenReturnsResponseWithStatus200() {
        val userId = 1L
        val email = "mark@mail.com"
        val now = Date()
        val user = User(
            email = email,
            createdAt = now,
            updatedAt = now,
            details = defaultDetails
        )
        val updateUserRequest = UpdateUserRequest.builder()
            .email(email)
            .build()

        val userResponse = UserResponse.builder()
            .email(email)
            .createdAt(now)
            .updatedAt(now)
            .build()

        every { service.userByEmailExists(email) } returns false
        every { service.findUserById(userId) } returns user
        every { mapper.toUser(updateUserRequest, user) } returns user
        every { service.saveUser(user) } returns user
        every { mapper.toUserResponse(user) } returns userResponse

        mockMvc.perform(TestUtil.mockPatchRequest(getUrl(userId), updateUserRequest))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect { result ->
                Assertions.assertEquals(Json.stringify(userResponse), result.response.contentAsString)
            }
    }

    @Test
    fun givenRequestHasInvalidEmail_whenUpdateUser_thenReturnsStatus400() {
        val userId = 1L
        val updateUserRequest = UpdateUserRequest.builder()
            .email("is-this-even-email")
            .build()

        mockMvc.perform(TestUtil.mockPatchRequest(getUrl(userId), updateUserRequest))
            .andExpect(MockMvcResultMatchers.status().isUnprocessableEntity)
            .andExpect { result ->
                Assertions.assertTrue(result.resolvedException is MethodArgumentNotValidException)
            }
            .andExpect { result ->
                MatcherAssert.assertThat(
                    result.resolvedException?.message,
                    CoreMatchers.containsString(VALIDATION_FAILED_MESSAGE)
                )
            }
    }

    @Test
    fun givenRequestHasIncompletePasswordData_whenUpdateUser_thenReturnsStatus422() {
        val userId = 1L
        val updateUserRequest = UpdateUserRequest.builder()
            .email("mark@mail.com")
            .oldPassword("123")
            .newPassword(null)
            .build()

        mockMvc.perform(TestUtil.mockPatchRequest(getUrl(userId), updateUserRequest))
            .andExpect(MockMvcResultMatchers.status().isUnprocessableEntity)
            .andExpect { result ->
                Assertions.assertTrue(result.resolvedException is ResourceException)
            }
    }

    @Test
    fun givenRequestHasInvalidOldPassword_whenUpdateUser_thenReturnsStatus403() {
        val userId = 1L
        val email = "mark@mail.com"
        val name = "Mark"
        val invalidOldPassword = "abba"
        val credentials = Credentials(
            userId = userId,
            hashedPassword = ByteArray(1),
            salt = ByteArray(2)
        )
        val updateUserRequest = UpdateUserRequest.builder()
            .email(email)
            .oldPassword(invalidOldPassword)
            .newPassword("abbath")
            .build()
        val user = User(
            email = email,
            details = Details(name = name),
            credentials = credentials
        )

        every { service.userByEmailExists(email) } returns false
        every { service.findUserById(userId) } returns user

        mockMvc.perform(TestUtil.mockPatchRequest(getUrl(userId), updateUserRequest))
            .andExpect(MockMvcResultMatchers.status().isForbidden)
            .andExpect { result ->
                Assertions.assertTrue(result.resolvedException is ResourceException)
            }
    }

    @Test
    fun givenRequestIsValidButUserDoesntExist_whenUpdateUser_thenReturnsStatus404() {
        val absentUserId = 10L
        val email = "mark@mail.com"
        val updateUserRequest = UpdateUserRequest.builder()
            .email(email)
            .build()

        every { service.userByEmailExists(email) } returns false
        every { service.findUserById(absentUserId) } returns null

        mockMvc.perform(TestUtil.mockPatchRequest(getUrl(absentUserId), updateUserRequest))
            .andExpect(MockMvcResultMatchers.status().isNotFound)
            .andExpect { result ->
                Assertions.assertTrue(result.resolvedException is ResourceException)
            }
    }

    @Test
    fun givenRequestHasEmailThatAlreadyExists_whenUpdateUser_thenReturnsStatus409() {
        val userId = 1L
        val existingEmail = "already-exists@mail.com"
        val updateUserRequest = UpdateUserRequest.builder()
            .email(existingEmail)
            .build()

        every { service.userByEmailExists(existingEmail) } returns true

        mockMvc.perform(TestUtil.mockPatchRequest(getUrl(userId), updateUserRequest))
            .andExpect(MockMvcResultMatchers.status().isConflict)
            .andExpect { result ->
                Assertions.assertTrue(result.resolvedException is ResourceException)
            }
    }
}

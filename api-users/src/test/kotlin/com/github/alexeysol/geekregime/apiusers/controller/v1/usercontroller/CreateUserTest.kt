package com.github.alexeysol.geekregime.apiusers.controller.v1.usercontroller

import com.github.alexeysol.geekregime.apicommons.exception.ResourceException
import com.github.alexeysol.geekregime.apicommons.generated.model.UserResponse
import com.github.alexeysol.geekregime.apicommons.util.TestUtil
import com.github.alexeysol.geekregime.apicommons.util.parser.Json
import com.github.alexeysol.geekregime.apiusers.generated.model.CreateUserRequest
import com.github.alexeysol.geekregime.apiusers.generated.model.CreateUserRequestDetails
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

class CreateUserTest(@Autowired mockMvc: MockMvc) : BaseUserControllerTest(mockMvc) {
    @Test
    fun givenRequestHasOnlyRequiredFields_whenCreateUser_thenReturnsResponseWithStatus200() {
        val email = "mark@mail.com"
        val name = "Mark"
        val now = Date()
        val user = User(
            email = email,
            createdAt = now,
            updatedAt = now,
            details = Details(name = name)
        )
        val createUserRequest = CreateUserRequest.builder()
            .email(email)
            .details(CreateUserRequestDetails.builder()
                .name(name)
                .build())
            .build()
        val userResponse = UserResponse.builder()
            .email(email)
            .createdAt(now)
            .updatedAt(now)
            .build()

        every { service.userByEmailExists(email) } returns false
        every { mapper.toUser(createUserRequest) } returns user
        every { service.saveUser(user) } returns user
        every { mapper.toUserResponse(user) } returns userResponse

        mockMvc.perform(TestUtil.mockPostRequest(getUrl(), createUserRequest))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect { result ->
                Assertions.assertEquals(Json.stringify(userResponse), result.response.contentAsString)
            }
    }

    @Test
    fun givenRequestHasPassword_whenCreateUser_thenReturnsResponseWithStatus200() {
        val email = "mark@mail.com"
        val name = "Mark"
        val password = "123"
        val now = Date()
        val user = User(
            email = email,
            createdAt = now,
            updatedAt = now,
            details = Details(name = name)
        )
        val createUserRequest = CreateUserRequest.builder()
            .email(email)
            .password(password)
            .details(CreateUserRequestDetails.builder()
                .name(name)
                .build())
            .build()
        val userResponse = UserResponse.builder()
            .email(email)
            .createdAt(now)
            .updatedAt(now)
            .build()

        every { service.userByEmailExists(email) } returns false
        every { mapper.toUser(createUserRequest) } returns user
        every { service.saveUser(user) } returns user
        every { mapper.toUserResponse(user) } returns userResponse

        mockMvc.perform(TestUtil.mockPostRequest(getUrl(), createUserRequest))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect { result ->
                Assertions.assertEquals(Json.stringify(userResponse), result.response.contentAsString)
            }
    }

    @Test
    fun givenRequestHasInvalidEmail_whenCreateUser_thenReturnsStatus400() {
        val createUserRequest = CreateUserRequest.builder()
            .email("is-this-even-email")
            .details(CreateUserRequestDetails.builder()
                .name("Mark")
                .build())
            .build()

        mockMvc.perform(TestUtil.mockPostRequest(getUrl(), createUserRequest))
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
    fun givenRequestHasBlankNameInDetails_whenCreateUser_thenReturnsStatus400() {
        val createUserRequest = CreateUserRequest.builder()
            .email("mark@mail.com")
            .details(CreateUserRequestDetails.builder()
                .name("")
                .build())
            .build()

        mockMvc.perform(TestUtil.mockPostRequest(getUrl(), createUserRequest))
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
    fun givenRequestHasBlankPassword_whenCreateUser_thenReturnsStatus400() {
        val createUserRequest = CreateUserRequest.builder()
            .email("mark@mail.com")
            .password("")
            .details(CreateUserRequestDetails.builder()
                .name("Mark")
                .build())
            .build()

        mockMvc.perform(TestUtil.mockPostRequest(getUrl(), createUserRequest))
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
    fun givenRequestHasEmailThatAlreadyExists_whenCreateUser_thenReturnsStatus409() {
        val existingEmail = "already-exists@mail.com"
        val createUserRequest = CreateUserRequest.builder()
            .email(existingEmail)
            .details(CreateUserRequestDetails.builder()
                .name("Mark")
                .build())
            .build()

        every { service.userByEmailExists(existingEmail) } returns true

        mockMvc.perform(TestUtil.mockPostRequest(getUrl(), createUserRequest))
            .andExpect(MockMvcResultMatchers.status().isConflict)
            .andExpect { result ->
                Assertions.assertTrue(result.resolvedException is ResourceException)
            }
    }
}

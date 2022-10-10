package com.github.alexeysol.geekregimeapiusers.controllers.v1.usercontroller

import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceException
import com.github.alexeysol.geekregimeapicommons.utils.Json
import com.github.alexeysol.geekregimeapicommons.utils.TestUtils
import com.github.alexeysol.geekregimeapiusers.testutils.createUserDto
import com.github.alexeysol.geekregimeapiusers.models.dtos.CreateUserDto
import com.github.alexeysol.geekregimeapiusers.models.entities.User
import com.github.alexeysol.geekregimeapiusers.models.dtos.CreateOrUpdateDetailsDto
import com.github.alexeysol.geekregimeapiusers.utils.sources.ApiUsersSource
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

class CreateUserTest(
    @Autowired mockMvc: MockMvc,
    @Autowired source: ApiUsersSource
) : BaseUserControllerTest(mockMvc, source) {
    @Test
    fun givenDtoIsValidButWithoutPassword_whenCreateUser_thenReturnsUserDtoWithStatus200() {
        val email = "mark@mail.com"
        val now = Date()
        val user = User(email = email, createdAt = now, updatedAt = now)
        val createUserDto = CreateUserDto(email = email)
        val userDto = createUserDto(email = email, createdAt = now, updatedAt = now)

        every { service.userAlreadyExists(email) } returns false
        every { mapper.fromCreateUserDtoToUser(createUserDto) } returns user
        every { service.createUser(user) } returns user
        every { mapper.fromUserToUserDto(user) } returns userDto

        mockMvc.perform(TestUtils.mockPostRequest(getUrl(), createUserDto))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect { result ->
                Assertions.assertEquals(Json.stringify(userDto), result.response.contentAsString)
            }
    }

    @Test
    fun givenDtoHasMatchingPasswordAndConfirmPassword_whenCreateUser_thenReturnsUserDtoWithStatus200() {
        val email = "mark@mail.com"
        val password = "123"
        val now = Date()
        val user = User(email = email, createdAt = now, updatedAt = now)
        val createUserDto = CreateUserDto(
            email = email,
            password = password,
            confirmPassword = password
        )
        val userDto = createUserDto(email = email, createdAt = now, updatedAt = now)

        every { service.userAlreadyExists(email) } returns false
        every { mapper.fromCreateUserDtoToUser(createUserDto) } returns user
        every { service.createUser(user, password = password) } returns user
        every { mapper.fromUserToUserDto(user) } returns userDto

        mockMvc.perform(TestUtils.mockPostRequest(getUrl(), createUserDto))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect { result ->
                Assertions.assertEquals(Json.stringify(userDto), result.response.contentAsString)
            }
    }

    @Test
    fun givenDtoHasInvalidEmail_whenCreateUser_thenReturnsStatus400() {
        val createUserDto = CreateUserDto(email = "is-this-even-email")

        mockMvc.perform(TestUtils.mockPostRequest(getUrl(), createUserDto))
            .andExpect(MockMvcResultMatchers.status().isBadRequest)
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
    fun givenDtoHasBlankNameInDetails_whenCreateUser_thenReturnsStatus400() {
        val createOrUpdateDetailsDto = CreateOrUpdateDetailsDto(name = "")
        val createUserDto = CreateUserDto(email = "mark@mail.com", details = createOrUpdateDetailsDto)

        mockMvc.perform(TestUtils.mockPostRequest(getUrl(), createUserDto))
            .andExpect(MockMvcResultMatchers.status().isBadRequest)
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
    fun givenDtoHasBlankPassword_whenCreateUser_thenReturnsStatus400() {
        val createUserDto = CreateUserDto(email = "mark@mail.com", password = "")

        mockMvc.perform(TestUtils.mockPostRequest(getUrl(), createUserDto))
            .andExpect(MockMvcResultMatchers.status().isBadRequest)
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
    fun givenDtoHasIncompletePasswordInfo_whenCreateUser_thenReturnsStatus400() {
        val createUserDto = CreateUserDto(
            email = "mark@mail.com",
            password = "123",
            confirmPassword = null
        )

        mockMvc.perform(TestUtils.mockPostRequest(getUrl(), createUserDto))
            .andExpect(MockMvcResultMatchers.status().isBadRequest)
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
    fun givenDtoHasNotMatchingPasswordAndConfirmPassword_whenCreateUser_thenReturnsStatus400() {
        val createUserDto = CreateUserDto(
            email = "mark@mail.com",
            password = "123",
            confirmPassword = "321"
        )

        mockMvc.perform(TestUtils.mockPostRequest(getUrl(), createUserDto))
            .andExpect(MockMvcResultMatchers.status().isBadRequest)
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
    fun givenDtoHasEmailThatAlreadyExists_whenCreateUser_thenReturnsStatus409() {
        val existingEmail = "already-exists@mail.com"
        val createUserDto = CreateUserDto(email = existingEmail)

        every { service.userAlreadyExists(existingEmail) } returns true

        mockMvc.perform(TestUtils.mockPostRequest(getUrl(), createUserDto))
            .andExpect(MockMvcResultMatchers.status().isConflict)
            .andExpect { result ->
                Assertions.assertTrue(result.resolvedException is ResourceException)
            }
    }
}

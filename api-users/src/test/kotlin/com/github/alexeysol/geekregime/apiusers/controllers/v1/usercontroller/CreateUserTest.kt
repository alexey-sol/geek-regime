package com.github.alexeysol.geekregime.apiusers.controllers.v1.usercontroller

import com.github.alexeysol.geekregime.apicommons.exceptions.ResourceException
import com.github.alexeysol.geekregime.apicommons.models.dtos.users.UserDto
import com.github.alexeysol.geekregime.apicommons.utils.parsers.Json
import com.github.alexeysol.geekregime.apicommons.utils.TestUtils
import com.github.alexeysol.geekregime.apiusers.models.dtos.CreateUserDto
import com.github.alexeysol.geekregime.apiusers.models.entities.User
import com.github.alexeysol.geekregime.apiusers.models.dtos.CreateDetailsDto
import com.github.alexeysol.geekregime.apiusers.models.entities.Details
import com.github.alexeysol.geekregime.apiusers.utils.sources.ApiUsersSource
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
        val name = "Mark"
        val now = Date()
        val user = User(
            email = email,
            createdAt = now,
            updatedAt = now,
            details = Details(name = name)
        )
        val createUserDto = CreateUserDto(
            email = email,
            details = CreateDetailsDto(name = name)
        )
        val userDto = UserDto.builder()
            .email(email)
            .createdAt(now)
            .updatedAt(now)
            .build()

        every { service.userByEmailExists(email) } returns false
        every { mapper.fromCreateUserDtoToUser(createUserDto) } returns user
        every { service.saveUser(user) } returns user
        every { mapper.fromUserToUserDto(user) } returns userDto

        mockMvc.perform(TestUtils.mockPostRequest(getUrl(), createUserDto))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect { result ->
                Assertions.assertEquals(Json.stringify(userDto), result.response.contentAsString)
            }
    }

    @Test
    fun givenDtoHasPassword_whenCreateUser_thenReturnsUserDtoWithStatus200() {
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
        val createUserDto = CreateUserDto(
            email = email,
            password = password,
            details = CreateDetailsDto(name = name)
        )
        val userDto = UserDto.builder()
            .email(email)
            .createdAt(now)
            .updatedAt(now)
            .build()

        every { service.userByEmailExists(email) } returns false
        every { mapper.fromCreateUserDtoToUser(createUserDto) } returns user
        every { service.saveUser(user) } returns user
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
        val createUserDto = CreateUserDto(
            email = "is-this-even-email",
            details = CreateDetailsDto(name = "Mark")
        )

        mockMvc.perform(TestUtils.mockPostRequest(getUrl(), createUserDto))
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
    fun givenDtoHasBlankNameInDetails_whenCreateUser_thenReturnsStatus400() {
        val createUserDto = CreateUserDto(
            email = "mark@mail.com",
            details = CreateDetailsDto(name = "")
        )

        mockMvc.perform(TestUtils.mockPostRequest(getUrl(), createUserDto))
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
    fun givenDtoHasBlankPassword_whenCreateUser_thenReturnsStatus400() {
        val createUserDto = CreateUserDto(
            email = "mark@mail.com",
            password = "",
            details = CreateDetailsDto(name = "Mark")
        )

        mockMvc.perform(TestUtils.mockPostRequest(getUrl(), createUserDto))
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
    fun givenDtoHasEmailThatAlreadyExists_whenCreateUser_thenReturnsStatus409() {
        val existingEmail = "already-exists@mail.com"
        val createUserDto = CreateUserDto(
            email = existingEmail,
            details = CreateDetailsDto(name = "Mark"),
        )

        every { service.userByEmailExists(existingEmail) } returns true

        mockMvc.perform(TestUtils.mockPostRequest(getUrl(), createUserDto))
            .andExpect(MockMvcResultMatchers.status().isConflict)
            .andExpect { result ->
                Assertions.assertTrue(result.resolvedException is ResourceException)
            }
    }
}

package com.github.alexeysol.geekregime.apiusers.controller.v1.usercontroller

import com.github.alexeysol.geekregime.apicommons.exception.ResourceException
import com.github.alexeysol.geekregime.apicommons.model.dto.user.UserDto
import com.github.alexeysol.geekregime.apicommons.util.TestUtil
import com.github.alexeysol.geekregime.apicommons.util.parser.Json
import com.github.alexeysol.geekregime.apiusers.model.dto.CreateDetailsDto
import com.github.alexeysol.geekregime.apiusers.model.dto.CreateUserDto
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

        mockMvc.perform(TestUtil.mockPostRequest(getUrl(), createUserDto))
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

        mockMvc.perform(TestUtil.mockPostRequest(getUrl(), createUserDto))
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

        mockMvc.perform(TestUtil.mockPostRequest(getUrl(), createUserDto))
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

        mockMvc.perform(TestUtil.mockPostRequest(getUrl(), createUserDto))
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

        mockMvc.perform(TestUtil.mockPostRequest(getUrl(), createUserDto))
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

        mockMvc.perform(TestUtil.mockPostRequest(getUrl(), createUserDto))
            .andExpect(MockMvcResultMatchers.status().isConflict)
            .andExpect { result ->
                Assertions.assertTrue(result.resolvedException is ResourceException)
            }
    }
}

package com.github.alexeysol.geekregimeapiusers.controllers.v1.usercontroller

import com.github.alexeysol.geekregimeapicommons.constants.ApiResourceExceptionCode
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceAlreadyExistsException
import com.github.alexeysol.geekregimeapicommons.utils.Json
import com.github.alexeysol.geekregimeapicommons.utils.TestUtils
import com.github.alexeysol.geekregimeapiusers.sources.ApiUsersSourceResolver
import com.github.alexeysol.geekregimeapiusers.models.dtos.CreateUserDto
import com.github.alexeysol.geekregimeapiusers.models.entities.User
import com.github.alexeysol.geekregimeapiusers.models.dtos.CreateOrUpdateDetailsDto
import com.github.alexeysol.geekregimeapiusers.models.dtos.UserDto
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
import java.time.Instant

class CreateUserTest(
    @Autowired mockMvc: MockMvc,
    @Autowired sourceResolver: ApiUsersSourceResolver
) : BaseUserControllerTest(mockMvc, sourceResolver) {
    @Test
    fun givenDtoIsValidButWithoutPassword_whenCreateUser_thenReturnsUserDtoWithStatus200() {
        val email = "mark@mail.com"
        val now = Instant.now()
        val user = User(email = email, createdAt = now, updatedAt = now)
        val createUserDto = CreateUserDto(email = email)
        val userDto = UserDto(email = email, createdAt = now, updatedAt = now)

        every { userService.userAlreadyExists(email) } returns false
        every { userMapper.fromCreateUserDtoToUser(createUserDto) } returns user
        every { userService.createUser(user) } returns user
        every { userMapper.fromUserToUserDto(user) } returns userDto

        mockMvc.perform(TestUtils.mockPostRequest(getUrl(), createUserDto))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect { result ->
                Assertions.assertEquals(result.response.contentAsString, Json.stringify(userDto))
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
    fun givenDtoHasEmailThatAlreadyExists_whenCreateUser_thenReturnsStatus409() {
        val existingEmail = "already-exists@mail.com"
        val createUserDto = CreateUserDto(email = existingEmail)

        every { userService.userAlreadyExists(existingEmail) } returns true

        mockMvc.perform(TestUtils.mockPostRequest(getUrl(), createUserDto))
            .andExpect(MockMvcResultMatchers.status().isConflict)
            .andExpect { result ->
                Assertions.assertTrue(result.resolvedException is ResourceAlreadyExistsException)
            }
            .andExpect { result ->
                MatcherAssert.assertThat(
                    result.resolvedException?.message,
                    CoreMatchers.containsString(ApiResourceExceptionCode.ALREADY_EXISTS.toString())
                )
            }
    }
}

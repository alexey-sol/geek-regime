package com.github.alexeysol.geekregimeapiusers.controllers.v1.usercontroller

import com.github.alexeysol.geekregimeapiusers.ApiUsersSourceResolver
import com.github.alexeysol.geekregimeapiusers.constants.ExceptionMessageConstants
import com.github.alexeysol.geekregimeapiusers.dtos.CreateUserDto
import com.github.alexeysol.geekregimeapiusers.entities.Details
import com.github.alexeysol.geekregimeapiusers.entities.User
import com.github.alexeysol.geekregimeapiusers.exceptions.UserAlreadyExistsException
import com.github.alexeysol.geekregimeapiusers.mockPostRequest
import com.github.alexeysol.geekregimeapiusers.objectToJsonString
import io.mockk.every
import org.hamcrest.CoreMatchers
import org.hamcrest.MatcherAssert
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.web.bind.MethodArgumentNotValidException

@SpringBootTest
@AutoConfigureMockMvc
class PostUserTest(
    @Autowired mockMvc: MockMvc,
    @Autowired sourceResolver: ApiUsersSourceResolver
) : BaseUserControllerTest(mockMvc, sourceResolver) {
    @Test
    fun givenDtoHasUser_whenPostUser_thenReturnsUserWithStatus200() {
        val user = User(id = 1, email = "mark@mail.com")
        val dto = CreateUserDto(user)
        every { service.userAlreadyExists(user.email) } returns false
        every { service.createUser(dto) } returns user

        mockMvc.perform(mockPostRequest(apiV1Path, dto))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect { result ->
                Assertions.assertEquals(result.response.contentAsString, objectToJsonString(user))
            }
    }

    @Test
    fun givenDtoHasUserWithDetails_whenPostUser_thenReturnsUserWithStatus200() {
        val details = Details(name = "Mark")
        val user = User(id = 1, email = "mark@mail.com", details = details)
        val dto = CreateUserDto(user)
        every { service.userAlreadyExists(user.email) } returns false
        every { service.createUser(dto) } returns user

        mockMvc.perform(mockPostRequest(apiV1Path, dto))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect { result ->
                Assertions.assertEquals(result.response.contentAsString, objectToJsonString(user))
            }
    }

    @Test
    fun givenDtoHasUserWithDetailsAndPassword_whenPostUser_thenReturnsUserWithStatus200() {
        val details = Details(name = "Mark")
        val user = User(id = 1, email = "mark@mail.com", details = details)
        val dto = CreateUserDto(user, password = "123")
        every { service.userAlreadyExists(user.email) } returns false
        every { service.createUser(dto) } returns user

        mockMvc.perform(mockPostRequest(apiV1Path, dto))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect { result ->
                Assertions.assertEquals(result.response.contentAsString, objectToJsonString(user))
            }
    }

    @Test
    fun givenDtoHasBlankEmailInUser_whenPostUser_thenReturnsStatus400() {
        val user = User(id = 1, email = "")
        val dto = CreateUserDto(user)

        mockMvc.perform(mockPostRequest(apiV1Path, dto))
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
    fun givenDtoHasInvalidEmailInUser_whenPostUser_thenReturnsStatus400() {
        val user = User(id = 1, email = "is-this-even-email")
        val dto = CreateUserDto(user)

        mockMvc.perform(mockPostRequest(apiV1Path, dto))
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
    fun givenDtoHasBlankNameInUser_whenPostUser_thenReturnsStatus400() {
        val details = Details(name = "")
        val user = User(id = 1, email = "mark@mail.com", details = details)
        val dto = CreateUserDto(user)

        mockMvc.perform(mockPostRequest(apiV1Path, dto))
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
    fun givenDtoHasBlankPassword_whenPostUser_thenReturnsStatus400() {
        val user = User(id = 1, email = "mark@mail.com")
        val dto = CreateUserDto(user, password = "")

        mockMvc.perform(mockPostRequest(apiV1Path, dto))
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
    fun givenDtoHasUserThatAlreadyExists_whenPostUser_thenReturnsStatus409() {
        val user = User(id = 1, email = "just-performing-meiosis@mail.com")
        val dto = CreateUserDto(user)
        every { service.userAlreadyExists(user.email) } returns true

        mockMvc.perform(mockPostRequest(apiV1Path, dto))
            .andExpect(MockMvcResultMatchers.status().isConflict)
            .andExpect { result ->
                Assertions.assertTrue(result.resolvedException is UserAlreadyExistsException)
            }
            .andExpect { result ->
                MatcherAssert.assertThat(
                    result.resolvedException?.message,
                    CoreMatchers.containsString(ExceptionMessageConstants.USER_ALREADY_EXISTS)
                )
            }
    }
}

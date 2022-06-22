package com.github.alexsol.geekregimeapiusers.controllers.v1

import com.fasterxml.jackson.databind.ObjectMapper
import com.github.alexsol.geekregimeapiusers.ApiUsersSourceResolver
import com.github.alexsol.geekregimeapiusers.constants.ExceptionMessageConstants as Constants
import com.github.alexsol.geekregimeapiusers.dtos.CreateUserDto
import com.github.alexsol.geekregimeapiusers.entities.Details
import com.github.alexsol.geekregimeapiusers.entities.User
import com.github.alexsol.geekregimeapiusers.exceptions.UserAlreadyExistsException
import com.github.alexsol.geekregimeapiusers.exceptions.UserNotFoundException
import com.github.alexsol.geekregimeapiusers.mockPostRequest
import com.github.alexsol.geekregimeapiusers.objectToJsonString
import com.github.alexsol.geekregimeapiusers.services.v1.UserService
import com.ninjasquad.springmockk.MockkBean
import io.mockk.every
import org.hamcrest.CoreMatchers.containsString
import org.hamcrest.MatcherAssert.assertThat
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import org.springframework.web.bind.MethodArgumentNotValidException

private const val VALIDATION_FAILED_MESSAGE = "Validation failed"

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest(
    @Autowired final val mockMvc: MockMvc,
    @Autowired final val sourceResolver: ApiUsersSourceResolver
) {
    @MockkBean
    lateinit var service: UserService

    private val apiV1Path = sourceResolver.getApiPath(1)

    @Test
    fun usersExist_whenGetAllUsers_thenReturnsUserListWithStatus200() {
        val user1 = User(id = 1, email = "mark@mail.com")
        val user2 = User(id = 2, email = "boobuntu@mail.com")
        val users = listOf(user1, user2)
        every { service.findAllUsers() } returns users

        mockMvc.perform(get(apiV1Path))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$").isArray)
            .andExpect(jsonPath("$").isNotEmpty)
            .andExpect { result ->
                assertEquals(result.response.contentAsString, objectToJsonString(users))
            }
    }

    @Test
    fun usersDontExist_whenGetAllUsers_thenReturnsEmptyListWithStatus200() {
        val emptyList = listOf<User>()
        every { service.findAllUsers() } returns emptyList

        mockMvc.perform(get(apiV1Path))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$").isArray)
            .andExpect(jsonPath("$").isEmpty)
    }

    @Test
    fun givenUserExist_whenGetUserById_thenReturnsUserWithStatus200() {
        val om = ObjectMapper()

        val user = User(id = 1, email = "mark@mail.com")
        every { service.findUserById(user.id) } returns user

        mockMvc.perform(get("${apiV1Path}/${user.id}"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect { result ->
                assertEquals(result.response.contentAsString, objectToJsonString(user))
            }
    }

    @Test
    fun givenUserDoesntExist_whenGetUserById_thenReturnsStatus404() {
        val nullUserId = 10
        every { service.findUserById(nullUserId) } returns null

        mockMvc.perform(get("${apiV1Path}/${nullUserId}"))
            .andExpect(status().isNotFound)
            .andExpect { result ->
                assertTrue(result.resolvedException is UserNotFoundException)
            }
            .andExpect { result ->
                assertThat(result.resolvedException?.message, containsString(Constants.USER_NOT_FOUND))
            }
    }

    @Test
    fun givenDtoHasUser_whenPostUser_thenReturnsUserWithStatus200() {
        val user = User(id = 1, email = "mark@mail.com")
        val dto = CreateUserDto(user)
        every { service.userAlreadyExists(user.email) } returns false
        every { service.createUser(dto) } returns user

        mockMvc.perform(mockPostRequest(apiV1Path, dto))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect { result ->
                assertEquals(result.response.contentAsString, objectToJsonString(user))
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
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect { result ->
                assertEquals(result.response.contentAsString, objectToJsonString(user))
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
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect { result ->
                assertEquals(result.response.contentAsString, objectToJsonString(user))
            }
    }

    @Test
    fun givenDtoHasBlankEmailInUser_whenPostUser_thenReturnsStatus400() {
        val user = User(id = 1, email = "")
        val dto = CreateUserDto(user)

        mockMvc.perform(mockPostRequest(apiV1Path, dto))
            .andExpect(status().isBadRequest)
            .andExpect { result ->
                assertTrue(result.resolvedException is MethodArgumentNotValidException)
            }
            .andExpect { result ->
                assertThat(result.resolvedException?.message, containsString(VALIDATION_FAILED_MESSAGE))
            }
    }

    @Test
    fun givenDtoHasInvalidEmailInUser_whenPostUser_thenReturnsStatus400() {
        val user = User(id = 1, email = "is-this-even-email")
        val dto = CreateUserDto(user)

        mockMvc.perform(mockPostRequest(apiV1Path, dto))
            .andExpect(status().isBadRequest)
            .andExpect { result ->
                assertTrue(result.resolvedException is MethodArgumentNotValidException)
            }
            .andExpect { result ->
                assertThat(result.resolvedException?.message, containsString(VALIDATION_FAILED_MESSAGE))
            }
    }

    @Test
    fun givenDtoHasBlankNameInUser_whenPostUser_thenReturnsStatus400() {
        val details = Details(name = "")
        val user = User(id = 1, email = "mark@mail.com", details = details)
        val dto = CreateUserDto(user)

        mockMvc.perform(mockPostRequest(apiV1Path, dto))
            .andExpect(status().isBadRequest)
            .andExpect { result ->
                assertTrue(result.resolvedException is MethodArgumentNotValidException)
            }
            .andExpect { result ->
                assertThat(result.resolvedException?.message, containsString(VALIDATION_FAILED_MESSAGE))
            }
    }

    @Test
    fun givenDtoHasBlankPassword_whenPostUser_thenReturnsStatus400() {
        val user = User(id = 1, email = "mark@mail.com")
        val dto = CreateUserDto(user, password = "")

        mockMvc.perform(mockPostRequest(apiV1Path, dto))
            .andExpect(status().isBadRequest)
            .andExpect { result ->
                assertTrue(result.resolvedException is MethodArgumentNotValidException)
            }
            .andExpect { result ->
                assertThat(result.resolvedException?.message, containsString(VALIDATION_FAILED_MESSAGE))
            }
    }

    @Test
    fun givenDtoHasUserAlreadyExists_whenPostUser_thenReturnsStatus409() {
        val user = User(id = 1, email = "just-performing-meiosis@mail.com")
        val dto = CreateUserDto(user)
        every { service.userAlreadyExists(user.email) } returns true

        mockMvc.perform(mockPostRequest(apiV1Path, dto))
            .andExpect(status().isConflict)
            .andExpect { result ->
                assertTrue(result.resolvedException is UserAlreadyExistsException)
            }
            .andExpect { result ->
                assertThat(result.resolvedException?.message, containsString(Constants.USER_ALREADY_EXISTS))
            }
    }

    @Test
    fun givenUserExists_whenDeleteUserById_thenReturnsUserIdWithStatus200() {
        val userId = 1
        every { service.removeUserById(userId) } returns userId

        mockMvc.perform(delete("${apiV1Path}/${userId}"))
            .andExpect(status().isOk)
    }

    @Test
    fun givenUserDoesntExist_whenDeleteUserById_thenReturnsStatus404() {
        val nullUserId = 10
        every { service.removeUserById(nullUserId) } returns null

        mockMvc.perform(delete("${apiV1Path}/${nullUserId}"))
            .andExpect(status().isNotFound)
            .andExpect { result ->
                assertTrue(result.resolvedException is UserNotFoundException)
            }
            .andExpect { result ->
                assertThat(result.resolvedException?.message, containsString(Constants.USER_NOT_FOUND))
            }
    }
}

package com.github.alexsol.geekregimeapiusers.controllers.v1

import com.github.alexsol.geekregimeapiusers.ApiUsersSourceResolver
import com.github.alexsol.geekregimeapiusers.dtos.CreateUserDto
import com.github.alexsol.geekregimeapiusers.entities.Details
import com.github.alexsol.geekregimeapiusers.entities.User
import com.github.alexsol.geekregimeapiusers.mockPostRequest
import com.github.alexsol.geekregimeapiusers.services.v1.UserService
import com.ninjasquad.springmockk.MockkBean
import io.mockk.every
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

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
            .andExpect(jsonPath("$[0].id").value(users[0].id))
            .andExpect(jsonPath("$[1].id").value(users[1].id))
    }

    @Test
    fun usersDoesntExist_whenGetAllUsers_thenReturnsEmptyListWithStatus200() {
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
        val user = User(id = 1, email = "mark@mail.com")

        every { service.findUserById(user.id) } returns user

        mockMvc.perform(get("${apiV1Path}/${user.id}"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(user.id))
    }

    @Test
    fun givenUserDoesntExist_whenGetUserById_thenReturnsStatus404() {
        val nonexistentUserId = 10

        every { service.findUserById(nonexistentUserId) } returns null

        mockMvc.perform(get("${apiV1Path}/${nonexistentUserId}"))
            .andExpect(status().isNotFound)
    }

    @Test
    fun givenDtoHasUser_whenPostUser_thenReturnsUserWithStatus200() {
        val user = User(id = 1, email = "mark@mail.com")
        val dto = CreateUserDto(user)

        every { service.createUser(dto) } returns user

        mockMvc.perform(mockPostRequest(apiV1Path, dto))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(user.id))
    }

    @Test
    fun givenDtoHasUserWithDetails_whenPostUser_thenReturnsUserWithStatus200() {
        val details = Details(name = "Mark")
        val user = User(id = 1, email = "mark@mail.com", details = details)
        val dto = CreateUserDto(user)

        every { service.createUser(dto) } returns user

        mockMvc.perform(mockPostRequest(apiV1Path, dto))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(user.id))
    }

    @Test
    fun givenDtoHasUserWithDetailsAndPassword_whenPostUser_thenReturnsUserWithStatus200() {
        val details = Details(name = "Mark")
        val user = User(id = 1, email = "mark@mail.com", details = details)
        val dto = CreateUserDto(user, password = "123")

        every { service.createUser(dto) } returns user

        mockMvc.perform(mockPostRequest(apiV1Path, dto))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(user.id))
    }

    @Test
    fun givenDtoHasBlankEmailInUser_whenPostUser_thenReturnsStatus400() {
        val user = User(id = 1, email = "")
        val dto = CreateUserDto(user)

        every { service.createUser(dto) } returns user

        mockMvc.perform(mockPostRequest(apiV1Path, dto))
            .andExpect(status().isBadRequest)
    }

    @Test
    fun givenDtoHasInvalidEmailInUser_whenPostUser_thenReturnsStatus400() {
        val user = User(id = 1, email = "is-this-even-email")
        val dto = CreateUserDto(user)

        every { service.createUser(dto) } returns user

        mockMvc.perform(mockPostRequest(apiV1Path, dto))
            .andExpect(status().isBadRequest)
    }

    @Test
    fun givenDtoHasBlankNameInUser_whenPostUser_thenReturnsStatus400() {
        val details = Details(name = "")
        val user = User(id = 1, email = "mark@mail.com", details = details)
        val dto = CreateUserDto(user)

        every { service.createUser(dto) } returns user

        mockMvc.perform(mockPostRequest(apiV1Path, dto))
            .andExpect(status().isBadRequest)
    }

    @Test
    fun givenDtoHasBlankPassword_whenPostUser_thenReturnsStatus400() {
        val user = User(id = 1, email = "mark@mail.com")
        val dto = CreateUserDto(user, password = "")

        every { service.createUser(dto) } returns user

        mockMvc.perform(mockPostRequest(apiV1Path, dto))
            .andExpect(status().isBadRequest)
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
        val nonexistentUserId = 10

        every { service.removeUserById(nonexistentUserId) } returns null

        mockMvc.perform(delete("${apiV1Path}/${nonexistentUserId}"))
            .andExpect(status().isNotFound)
    }
}

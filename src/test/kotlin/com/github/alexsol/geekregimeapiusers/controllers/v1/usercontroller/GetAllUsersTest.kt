package com.github.alexsol.geekregimeapiusers.controllers.v1.usercontroller

import com.github.alexsol.geekregimeapiusers.ApiUsersSourceResolver
import com.github.alexsol.geekregimeapiusers.entities.User
import com.github.alexsol.geekregimeapiusers.objectToJsonString
import io.mockk.every
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers

@SpringBootTest
@AutoConfigureMockMvc
class GetAllUsers(
    @Autowired mockMvc: MockMvc,
    @Autowired sourceResolver: ApiUsersSourceResolver
) : BaseUserControllerTest(mockMvc, sourceResolver) {
    @Test
    fun usersExist_whenGetAllUsers_thenReturnsUserListWithStatus200() {
        val user1 = User(id = 1, email = "mark@mail.com")
        val user2 = User(id = 2, email = "boobuntu@mail.com")
        val users = listOf(user1, user2)
        every { service.findAllUsers() } returns users

        mockMvc.perform(MockMvcRequestBuilders.get(apiV1Path))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$").isArray)
            .andExpect(MockMvcResultMatchers.jsonPath("$").isNotEmpty)
            .andExpect { result ->
                Assertions.assertEquals(result.response.contentAsString, objectToJsonString(users))
            }
    }

    @Test
    fun usersDontExist_whenGetAllUsers_thenReturnsEmptyListWithStatus200() {
        val emptyList = listOf<User>()
        every { service.findAllUsers() } returns emptyList

        mockMvc.perform(MockMvcRequestBuilders.get(apiV1Path))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$").isArray)
            .andExpect(MockMvcResultMatchers.jsonPath("$").isEmpty)
    }
}

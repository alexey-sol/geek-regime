package com.github.alexeysol.geekregimeapiusers.controllers.v1.usercontroller

import com.github.alexeysol.geekregimeapiusers.sources.ApiUsersSourceResolver
import com.github.alexeysol.geekregimeapiusers.models.entities.User
import com.github.alexeysol.geekregimeapiusers.objectToJsonString
import com.jayway.jsonpath.JsonPath
import io.mockk.every
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.mock.web.MockHttpServletResponse
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers

@SpringBootTest
@AutoConfigureMockMvc
class GetAllUsersTest(
    @Autowired mockMvc: MockMvc,
    @Autowired sourceResolver: ApiUsersSourceResolver
) : BaseUserControllerTest(mockMvc, sourceResolver) {
    private val initialId1 = 1L
    private val initialId2 = 2L
    private val user1 = User(id = initialId1, email = "mark@mail.com")
    private val user2 = User(id = initialId2, email = "boobuntu@mail.com")

    @Test
    fun allUsersExist_whenGetAllUsers_thenReturnsUserListWithStatus200() {
        val users = listOf(user1, user2)
        every { service.findAllUsers() } returns users

        mockMvc.perform(MockMvcRequestBuilders.get(apiV1Path))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$").isArray)
            .andExpect(MockMvcResultMatchers.jsonPath("$").isNotEmpty)
            .andExpect { result ->
                responseContentEqualsProvidedList(result.response, users)
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

    @Test
    fun allUsersExist_whenGetAllUsersByIds_thenReturnsUserListWithStatus200() {
        val users = listOf(user1, user2)
        val userIds = listOf(initialId1, initialId2)
        every { service.findAllUsersById(userIds) } returns users

        val requestBuilder = MockMvcRequestBuilders.get(apiV1Path)
            .queryParam("ids", initialId1.toString(), initialId2.toString())

        mockMvc.perform(requestBuilder)
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$").isArray)
            .andExpect(MockMvcResultMatchers.jsonPath("$").isNotEmpty)
            .andExpect { result ->
                responseContentEqualsProvidedList(result.response, users)
            }
    }

    @Test
    fun fewUsersExist_whenGetAllUsersByIds_thenReturnsUserListWithStatus200() {
        val absentId1 = 10L
        val absentId2 = 11L
        val users = listOf(user1)
        val userIds = listOf(initialId1, absentId1, absentId2)
        every { service.findAllUsersById(userIds) } returns users

        val requestBuilder = MockMvcRequestBuilders.get(apiV1Path)
            .queryParam("ids", initialId1.toString(), absentId1.toString(), absentId2.toString())

        mockMvc.perform(requestBuilder)
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$").isArray)
            .andExpect(MockMvcResultMatchers.jsonPath("$").isNotEmpty)
            .andExpect { result ->
                responseContentEqualsProvidedList(result.response, users)
            }
    }

    @Test
    fun usersDontExist_whenGetAllUsersByIds_thenReturnsEmptyListWithStatus200() {
        val absentId1 = 10L
        val absentId2 = 11L
        val emptyList = listOf<User>()
        val userIds = listOf(absentId1, absentId2)
        every { service.findAllUsersById(userIds) } returns emptyList

        val requestBuilder = MockMvcRequestBuilders.get(apiV1Path)
            .queryParam("ids", absentId1.toString(), absentId2.toString())

        mockMvc.perform(requestBuilder)
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$").isArray)
            .andExpect(MockMvcResultMatchers.jsonPath("$").isEmpty)
    }

    private fun <Item>responseContentEqualsProvidedList(
        response: MockHttpServletResponse,
        list: List<Item>
    ) {
        val contentAsString = response.contentAsString
        Assertions.assertEquals(contentAsString, objectToJsonString(list))
        Assertions.assertEquals(JsonPath.read(contentAsString, "$.length()"), list.size)
    }
}

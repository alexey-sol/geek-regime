package com.github.alexeysol.geekregime.apiusers.controller.v1.usercontroller

import com.github.alexeysol.geekregime.apicommons.exception.ResourceException
import com.github.alexeysol.geekregime.apicommons.generated.model.UserResponse
import com.github.alexeysol.geekregime.apicommons.util.parser.Json
import com.github.alexeysol.geekregime.apiusers.model.entity.User
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
class FindUserByIdOrSlugTest(@Autowired mockMvc: MockMvc) : BaseUserControllerTest(mockMvc) {
    @Test
    fun givenUserWithIdExists_whenFindUserByIdOrSlug_thenReturnsResponseWithStatus200() {
        val userId = 1L
        val slug = "mark"
        val user = User(slug = slug, details = defaultDetails)
        val userResponse = UserResponse.builder()
            .slug(slug)
            .build()

        every { service.findUserById(userId) } returns user
        every { mapper.toUserResponse(user) } returns userResponse

        mockMvc.perform(MockMvcRequestBuilders.get(getUrl(userId)))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect { result ->
                Assertions.assertEquals(Json.stringify(userResponse), result.response.contentAsString)
            }
    }

    @Test
    fun givenUserWithSlugExists_whenFindUserByIdOrSlug_thenReturnsResponseWithStatus200() {
        val slug = "mark"
        val user = User(slug = slug, details = defaultDetails)
        val userResponse = UserResponse.builder()
            .slug(slug)
            .build()

        every { service.findUserBySlug(slug) } returns user
        every { mapper.toUserResponse(user) } returns userResponse

        mockMvc.perform(MockMvcRequestBuilders.get(getUrl(slug)))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect { result ->
                Assertions.assertEquals(Json.stringify(userResponse), result.response.contentAsString)
            }
    }

    @Test
    fun givenUserDoesntExist_whenFindUserByIdOrSlug_thenReturnsStatus404() {
        val absentUserId = 10L

        every { service.findUserById(absentUserId) } returns null

        mockMvc.perform(MockMvcRequestBuilders.get(getUrl(absentUserId)))
            .andExpect(MockMvcResultMatchers.status().isNotFound)
            .andExpect { result ->
                Assertions.assertTrue(result.resolvedException is ResourceException)
            }
    }
}

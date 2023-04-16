package com.github.alexeysol.geekregime.apiusers.controllers.v1.usercontroller

import com.github.alexeysol.geekregime.apicommons.exceptions.ResourceException
import com.github.alexeysol.geekregime.apicommons.models.dtos.users.UserDto
import com.github.alexeysol.geekregime.apicommons.utils.parsers.Json
import com.github.alexeysol.geekregime.apiusers.models.entities.User
import com.github.alexeysol.geekregime.apiusers.utils.sources.ApiUsersSource
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
class FindUserByIdOrSlugTest(
    @Autowired mockMvc: MockMvc,
    @Autowired source: ApiUsersSource
) : BaseUserControllerTest(mockMvc, source) {
    @Test
    fun givenUserWithIdExists_whenFindUserByIdOrSlug_thenReturnsUserWithStatus200() {
        val userId = 1L
        val slug = "mark"
        val user = User(slug = slug, details = defaultDetails)
        val userDto = UserDto.builder().slug(slug).build()

        every { service.findUserById(userId) } returns user
        every { mapper.fromUserToUserDto(user) } returns userDto

        mockMvc.perform(MockMvcRequestBuilders.get(getUrl(userId)))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect { result ->
                Assertions.assertEquals(Json.stringify(userDto), result.response.contentAsString)
            }
    }

    @Test
    fun givenUserWithSlugExists_whenFindUserByIdOrSlug_thenReturnsUserWithStatus200() {
        val slug = "mark"
        val user = User(slug = slug, details = defaultDetails)
        val userDto = UserDto.builder().slug(slug).build()

        every { service.findUserBySlug(slug) } returns user
        every { mapper.fromUserToUserDto(user) } returns userDto

        mockMvc.perform(MockMvcRequestBuilders.get(getUrl(slug)))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect { result ->
                Assertions.assertEquals(Json.stringify(userDto), result.response.contentAsString)
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

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
class FindUserBySlugTest(
    @Autowired mockMvc: MockMvc,
    @Autowired source: ApiUsersSource
) : BaseUserControllerTest(mockMvc, source) {
    @Test
    fun givenUserExists_whenFindUserBySlug_thenReturnsUserWithStatus200() {
        val email = "mark@mail.com"
        val slug = "mark"
        val user = User(email = "mark@mail.com", slug = slug, details = defaultDetails)
        val userDto = UserDto.builder()
            .email(email)
            .slug(slug)
            .build()

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
    fun givenUserDoesntExist_whenFindUserBySlug_thenReturnsStatus404() {
        val absentUserSlug = "who"

        every { service.findUserBySlug(absentUserSlug) } returns null

        mockMvc.perform(MockMvcRequestBuilders.get(getUrl(absentUserSlug)))
            .andExpect(MockMvcResultMatchers.status().isNotFound)
            .andExpect { result ->
                Assertions.assertTrue(result.resolvedException is ResourceException)
            }
    }
}

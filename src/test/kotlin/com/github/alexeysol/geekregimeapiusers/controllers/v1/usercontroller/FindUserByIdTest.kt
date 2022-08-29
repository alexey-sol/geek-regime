package com.github.alexeysol.geekregimeapiusers.controllers.v1.usercontroller

import com.github.alexeysol.geekregimeapicommons.constants.ApiResourceExceptionCode
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceNotFoundException
import com.github.alexeysol.geekregimeapicommons.utils.Json
import com.github.alexeysol.geekregimeapiusers.models.dtos.UserDto
import com.github.alexeysol.geekregimeapiusers.sources.ApiUsersSourceResolver
import com.github.alexeysol.geekregimeapiusers.models.entities.User
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
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers

@SpringBootTest
@AutoConfigureMockMvc
class FindUserByIdTest(
    @Autowired mockMvc: MockMvc,
    @Autowired sourceResolver: ApiUsersSourceResolver
) : BaseUserControllerTest(mockMvc, sourceResolver) {
    @Test
    fun givenUserExists_whenFindUserById_thenReturnsUserWithStatus200() {
        val userId = 1L
        val user = User(id = userId, email = "mark@mail.com")
        val userDto = UserDto(id = userId, email = "mark@mail.com")

        every { userService.findUserById(userId) } returns user
        every { userMapper.fromUserToUserDto(user) } returns userDto

        mockMvc.perform(MockMvcRequestBuilders.get(getUrl(userId)))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect { result ->
                Assertions.assertEquals(result.response.contentAsString, Json.stringify(userDto))
            }
    }

    @Test
    fun givenUserDoesntExist_whenFindUserById_thenReturnsStatus404() {
        val absentUserId = 10L

        every { userService.findUserById(absentUserId) } returns null

        mockMvc.perform(MockMvcRequestBuilders.get(getUrl(absentUserId)))
            .andExpect(MockMvcResultMatchers.status().isNotFound)
            .andExpect { result ->
                Assertions.assertTrue(result.resolvedException is ResourceNotFoundException)
            }
            .andExpect { result ->
                MatcherAssert.assertThat(
                    result.resolvedException?.message,
                    CoreMatchers.containsString(ApiResourceExceptionCode.NOT_FOUND.toString())
                )
            }
    }
}

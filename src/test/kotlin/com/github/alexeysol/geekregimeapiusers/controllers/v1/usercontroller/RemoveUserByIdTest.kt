package com.github.alexeysol.geekregimeapiusers.controllers.v1.usercontroller

import com.github.alexeysol.geekregimeapicommons.constants.ApiResourceExceptionCode
import com.github.alexeysol.geekregimeapicommons.constants.DefaultValueConstants
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceNotFoundException
import com.github.alexeysol.geekregimeapiusers.sources.ApiUsersSourceResolver
import io.mockk.every
import org.hamcrest.CoreMatchers
import org.hamcrest.MatcherAssert
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers

@SpringBootTest
@AutoConfigureMockMvc
class RemoveUserByIdTest(
    @Autowired mockMvc: MockMvc,
    @Autowired sourceResolver: ApiUsersSourceResolver
) : BaseUserControllerTest(mockMvc, sourceResolver) {
    @Test
    fun givenUserExists_whenRemoveUserById_thenReturnsUserIdWithStatus200() {
        val userId = 1L

        every { userService.removeUserById(userId) } returns userId

        mockMvc.perform(MockMvcRequestBuilders.delete(getUrl(userId)))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect { result ->
                Assertions.assertEquals(result.response.contentAsString, userId.toString())
            }
    }

    @Test
    fun givenUserDoesntExist_whenRemoveUserById_thenReturnsStatus404() {
        val absentUserId = 10L

        every { userService.removeUserById(absentUserId) } returns DefaultValueConstants.NOT_FOUND_BY_ID

        mockMvc.perform(MockMvcRequestBuilders.delete(getUrl(absentUserId)))
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

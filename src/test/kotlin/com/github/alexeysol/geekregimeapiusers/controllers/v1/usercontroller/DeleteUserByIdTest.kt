package com.github.alexeysol.geekregimeapiusers.controllers.v1.usercontroller

import com.github.alexeysol.geekregimeapiusers.ApiUsersSourceResolver
import com.github.alexeysol.geekregimeapiusers.constants.ExceptionMessageConstants
import com.github.alexeysol.geekregimeapiusers.exceptions.UserNotFoundException
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
class DeleteUserByIdTest(
    @Autowired mockMvc: MockMvc,
    @Autowired sourceResolver: ApiUsersSourceResolver
) : BaseUserControllerTest(mockMvc, sourceResolver) {
    @Test
    fun givenUserExists_whenDeleteUserById_thenReturnsUserIdWithStatus200() {
        val userId = 1
        every { service.removeUserById(userId) } returns userId

        mockMvc.perform(MockMvcRequestBuilders.delete("${apiV1Path}/${userId}"))
            .andExpect(MockMvcResultMatchers.status().isOk)
    }

    @Test
    fun givenUserDoesntExist_whenDeleteUserById_thenReturnsStatus404() {
        val absentUserId = 10
        every { service.removeUserById(absentUserId) } returns null

        mockMvc.perform(MockMvcRequestBuilders.delete("${apiV1Path}/${absentUserId}"))
            .andExpect(MockMvcResultMatchers.status().isNotFound)
            .andExpect { result ->
                Assertions.assertTrue(result.resolvedException is UserNotFoundException)
            }
            .andExpect { result ->
                MatcherAssert.assertThat(
                    result.resolvedException?.message,
                    CoreMatchers.containsString(ExceptionMessageConstants.USER_NOT_FOUND)
                )
            }
    }
}

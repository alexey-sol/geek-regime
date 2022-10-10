package com.github.alexeysol.geekregimeapiusers.controllers.v1.usercontroller

import com.github.alexeysol.geekregimeapicommons.constants.DefaultsConstants
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceException
import com.github.alexeysol.geekregimeapicommons.models.dtos.DeletionResultDto
import com.github.alexeysol.geekregimeapicommons.utils.Json
import com.github.alexeysol.geekregimeapiusers.utils.sources.ApiUsersSource
import io.mockk.every
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
    @Autowired source: ApiUsersSource
) : BaseUserControllerTest(mockMvc, source) {
    @Test
    fun givenUserExists_whenRemoveUserById_thenReturnsDeletionResultDtoWithStatus200() {
        val userId = 1L
        val resultDto = DeletionResultDto(userId)

        every { service.removeUserById(userId) } returns userId
        every { mapper.fromIdToDeletionResultDto(userId) } returns resultDto

        mockMvc.perform(MockMvcRequestBuilders.delete(getUrl(userId)))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect { result ->
                Assertions.assertEquals(Json.stringify(resultDto), result.response.contentAsString)
            }
    }

    @Test
    fun givenUserDoesntExist_whenRemoveUserById_thenReturnsStatus404() {
        val absentUserId = 10L

        every { service.removeUserById(absentUserId) } returns DefaultsConstants.NOT_FOUND_BY_ID

        mockMvc.perform(MockMvcRequestBuilders.delete(getUrl(absentUserId)))
            .andExpect(MockMvcResultMatchers.status().isNotFound)
            .andExpect { result ->
                Assertions.assertTrue(result.resolvedException is ResourceException)
            }
    }
}

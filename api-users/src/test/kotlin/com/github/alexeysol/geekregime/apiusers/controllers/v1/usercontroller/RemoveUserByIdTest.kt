package com.github.alexeysol.geekregime.apiusers.controllers.v1.usercontroller

import com.github.alexeysol.geekregime.apicommons.constants.Defaults
import com.github.alexeysol.geekregime.apicommons.exceptions.ResourceException
import com.github.alexeysol.geekregime.apicommons.models.dtos.shared.HasIdDto
import com.github.alexeysol.geekregime.apicommons.utils.parsers.Json
import com.github.alexeysol.geekregime.apiusers.utils.sources.ApiUsersSource
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
    fun givenUserExists_whenRemoveUserById_thenReturnsResultDtoWithStatus200() {
        val userId = 1L
        val resultDto = HasIdDto(userId)

        every { service.removeUserById(userId) } returns userId
        every { mapper.fromIdToHasIdDto(userId) } returns resultDto

        mockMvc.perform(MockMvcRequestBuilders.delete(getUrl(userId)))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect { result ->
                Assertions.assertEquals(Json.stringify(resultDto), result.response.contentAsString)
            }
    }

    @Test
    fun givenUserDoesntExist_whenRemoveUserById_thenReturnsStatus404() {
        val absentUserId = 10L

        every { service.removeUserById(absentUserId) } returns Defaults.NOT_FOUND_BY_ID

        mockMvc.perform(MockMvcRequestBuilders.delete(getUrl(absentUserId)))
            .andExpect(MockMvcResultMatchers.status().isNotFound)
            .andExpect { result ->
                Assertions.assertTrue(result.resolvedException is ResourceException)
            }
    }
}

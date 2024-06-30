package com.github.alexeysol.geekregime.apiusers.controller.v1.usercontroller

import com.github.alexeysol.geekregime.apicommons.constant.Default
import com.github.alexeysol.geekregime.apicommons.exception.ResourceException
import com.github.alexeysol.geekregime.apicommons.generated.model.IdResponse
import com.github.alexeysol.geekregime.apicommons.util.parser.Json
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
class RemoveUserByIdTest(@Autowired mockMvc: MockMvc) : BaseUserControllerTest(mockMvc) {
    @Test
    fun givenUserExists_whenRemoveUserById_thenReturnsResponseWithStatus200() {
        val userId = 1L
        val idResponse = IdResponse(userId)

        every { service.removeUserById(userId) } returns userId
        every { mapper.toIdResponse(userId) } returns idResponse

        mockMvc.perform(MockMvcRequestBuilders.delete(getUrl(userId)))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect { result ->
                Assertions.assertEquals(Json.stringify(idResponse), result.response.contentAsString)
            }
    }

    @Test
    fun givenUserDoesntExist_whenRemoveUserById_thenReturnsStatus404() {
        val absentUserId = 10L

        every { service.removeUserById(absentUserId) } returns Default.NOT_FOUND_BY_ID

        mockMvc.perform(MockMvcRequestBuilders.delete(getUrl(absentUserId)))
            .andExpect(MockMvcResultMatchers.status().isNotFound)
            .andExpect { result ->
                Assertions.assertTrue(result.resolvedException is ResourceException)
            }
    }
}

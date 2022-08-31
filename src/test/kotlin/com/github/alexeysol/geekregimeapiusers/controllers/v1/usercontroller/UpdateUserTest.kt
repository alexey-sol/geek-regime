package com.github.alexeysol.geekregimeapiusers.controllers.v1.usercontroller

import com.github.alexeysol.geekregimeapicommons.constants.ApiResourceExceptionCode
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceAlreadyExistsException
import com.github.alexeysol.geekregimeapicommons.utils.Json
import com.github.alexeysol.geekregimeapicommons.utils.TestUtils
import com.github.alexeysol.geekregimeapiusers.models.dtos.UpdateUserDto
import com.github.alexeysol.geekregimeapiusers.sources.ApiUsersSourceResolver
import com.github.alexeysol.geekregimeapiusers.models.entities.User
import com.github.alexeysol.geekregimeapiusers.models.dtos.UserDto
import io.mockk.every
import org.hamcrest.CoreMatchers
import org.hamcrest.MatcherAssert
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.web.bind.MethodArgumentNotValidException
import java.time.Instant

class UpdateUserTest(
    @Autowired mockMvc: MockMvc,
    @Autowired sourceResolver: ApiUsersSourceResolver
) : BaseUserControllerTest(mockMvc, sourceResolver) {
    @Test
    fun givenDtoIsValid_whenUpdateUser_thenReturnsUserDtoWithStatus200() {
        val userId = 1L
        val email = "mark@mail.com"
        val now = Instant.now()
        val user = User(email = email, createdAt = now, updatedAt = now)
        val updateUserDto = UpdateUserDto(email = email)
        val userDto = UserDto(email = email, createdAt = now, updatedAt = now)

        every { userMapper.fromUpdateUserDtoToUser(updateUserDto, userId) } returns user
        every { userService.userAlreadyExists(email) } returns false
        every { userService.updateUser(userId, user) } returns user
        every { userMapper.fromUserToUserDto(user) } returns userDto

        mockMvc.perform(TestUtils.mockPatchRequest(getUrl(userId), updateUserDto))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect { result ->
                Assertions.assertEquals(result.response.contentAsString, Json.stringify(userDto))
            }
    }

    @Test
    fun givenDtoHasInvalidEmail_whenUpdateUser_thenReturnsStatus400() {
        val userId = 1L
        val updateUserDto = UpdateUserDto(email = "is-this-even-email")

        mockMvc.perform(TestUtils.mockPatchRequest(getUrl(userId), updateUserDto))
            .andExpect(MockMvcResultMatchers.status().isBadRequest)
            .andExpect { result ->
                Assertions.assertTrue(result.resolvedException is MethodArgumentNotValidException)
            }
            .andExpect { result ->
                MatcherAssert.assertThat(
                    result.resolvedException?.message,
                    CoreMatchers.containsString(VALIDATION_FAILED_MESSAGE)
                )
            }
    }

    @Test
    fun givenDtoHasIncompletePasswordInfo_whenUpdateUser_thenReturnsStatus400() {
        val userId = 1L
        val updateUserDto = UpdateUserDto(
            email = "mark@mail.com",
            oldPassword = "123",
            newPassword = null
        )

        mockMvc.perform(TestUtils.mockPatchRequest(getUrl(userId), updateUserDto))
            .andExpect(MockMvcResultMatchers.status().isBadRequest)
            .andExpect { result ->
                Assertions.assertTrue(result.resolvedException is MethodArgumentNotValidException)
            }
            .andExpect { result ->
                MatcherAssert.assertThat(
                    result.resolvedException?.message,
                    CoreMatchers.containsString(VALIDATION_FAILED_MESSAGE)
                )
            }
    }

    @Test
    fun givenDtoHasEmailThatAlreadyExists_whenUpdateUser_thenReturnsStatus409() {
        val userId = 1L
        val existingEmail = "already-exists@mail.com"
        val updateUserDto = UpdateUserDto(email = existingEmail)

        every { userService.userAlreadyExists(existingEmail) } returns true

        mockMvc.perform(TestUtils.mockPatchRequest(getUrl(userId), updateUserDto))
            .andExpect(MockMvcResultMatchers.status().isConflict)
            .andExpect { result ->
                Assertions.assertTrue(result.resolvedException is ResourceAlreadyExistsException)
            }
            .andExpect { result ->
                MatcherAssert.assertThat(
                    result.resolvedException?.message,
                    CoreMatchers.containsString(ApiResourceExceptionCode.ALREADY_EXISTS.toString())
                )
            }
    }
}

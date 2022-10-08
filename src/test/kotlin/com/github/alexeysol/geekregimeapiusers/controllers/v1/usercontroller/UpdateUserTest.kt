package com.github.alexeysol.geekregimeapiusers.controllers.v1.usercontroller

import com.github.alexeysol.geekregimeapicommons.constants.ApiResourceExceptionCode
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceAlreadyExistsException
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceForbiddenException
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceNotFoundException
import com.github.alexeysol.geekregimeapicommons.utils.Json
import com.github.alexeysol.geekregimeapicommons.utils.TestUtils
import com.github.alexeysol.geekregimeapiusers.createUserDto
import com.github.alexeysol.geekregimeapiusers.models.dtos.UpdateUserDto
import com.github.alexeysol.geekregimeapiusers.models.entities.Credentials
import com.github.alexeysol.geekregimeapiusers.models.entities.Details
import com.github.alexeysol.geekregimeapiusers.sources.ApiUsersSourceResolver
import com.github.alexeysol.geekregimeapiusers.models.entities.User
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
import java.util.*

class UpdateUserTest(
    @Autowired mockMvc: MockMvc,
    @Autowired sourceResolver: ApiUsersSourceResolver
) : BaseUserControllerTest(mockMvc, sourceResolver) {
    @Test
    fun givenDtoIsValid_whenUpdateUser_thenReturnsUserDtoWithStatus200() {
        val userId = 1L
        val email = "mark@mail.com"
        val now = Date()
        val user = User(email = email, createdAt = now, updatedAt = now)
        val updateUserDto = UpdateUserDto(email = email)
        val userDto = createUserDto(email = email, createdAt = now, updatedAt = now)

        every { userService.userAlreadyExists(email) } returns false
        every { userService.findUserById(userId) } returns user
        every { userMapper.fromUpdateUserDtoToUser(updateUserDto, user) } returns user
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
    fun givenDtoHasInvalidOldPassword_whenUpdateUser_thenReturnsStatus403() {
        val userId = 1L
        val email = "mark@mail.com"
        val name = "Mark"
        val invalidOldPassword = "abba"
        val details = Details(name = name)
        val credentials = Credentials(
            userId = userId,
            hashedPassword = ByteArray(1),
            salt = ByteArray(2)
        )
        val updateUserDto = UpdateUserDto(
            email = email,
            oldPassword = invalidOldPassword,
            newPassword = "abbath"
        )
        val user = User(email = email, details = details, credentials = credentials)

        every { userService.userAlreadyExists(email) } returns false
        every { userService.findUserById(userId) } returns user

        mockMvc.perform(TestUtils.mockPatchRequest(getUrl(userId), updateUserDto))
            .andExpect(MockMvcResultMatchers.status().isForbidden)
            .andExpect { result ->
                Assertions.assertTrue(result.resolvedException is ResourceForbiddenException)
            }
            .andExpect { result ->
                MatcherAssert.assertThat(
                    result.resolvedException?.message,
                    CoreMatchers.containsString(ApiResourceExceptionCode.FORBIDDEN.toString())
                )
            }
    }

    @Test
    fun givenDtoIsForAbsentUser_whenUpdateUser_thenReturnsStatus404() {
        val absentUserId = 10L
        val email = "mark@mail.com"
        val updateUserDto = UpdateUserDto(email = email)

        every { userService.userAlreadyExists(email) } returns false
        every { userService.findUserById(absentUserId) } returns null

        mockMvc.perform(TestUtils.mockPatchRequest(getUrl(absentUserId), updateUserDto))
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

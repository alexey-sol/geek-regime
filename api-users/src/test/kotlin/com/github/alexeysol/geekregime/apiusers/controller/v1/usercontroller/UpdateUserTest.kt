package com.github.alexeysol.geekregime.apiusers.controller.v1.usercontroller

import com.github.alexeysol.geekregime.apicommons.exception.ResourceException
import com.github.alexeysol.geekregime.apicommons.model.dto.user.UserDto
import com.github.alexeysol.geekregime.apicommons.util.TestUtil
import com.github.alexeysol.geekregime.apicommons.util.parser.Json
import com.github.alexeysol.geekregime.apiusers.model.dto.UpdateUserDto
import com.github.alexeysol.geekregime.apiusers.model.entity.Credentials
import com.github.alexeysol.geekregime.apiusers.model.entity.Details
import com.github.alexeysol.geekregime.apiusers.model.entity.User
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

class UpdateUserTest(@Autowired mockMvc: MockMvc) : BaseUserControllerTest(mockMvc) {
    @Test
    fun givenDtoIsValid_whenUpdateUser_thenReturnsUserDtoWithStatus200() {
        val userId = 1L
        val email = "mark@mail.com"
        val now = Date()
        val user = User(
            email = email,
            createdAt = now,
            updatedAt = now,
            details = defaultDetails
        )
        val updateUserDto = UpdateUserDto(email = email)
        val userDto = UserDto.builder()
            .email(email)
            .createdAt(now)
            .updatedAt(now)
            .build()

        every { service.userByEmailExists(email) } returns false
        every { service.findUserById(userId) } returns user
        every { mapper.fromUpdateUserDtoToUser(updateUserDto, user) } returns user
        every { service.saveUser(user) } returns user
        every { mapper.fromUserToUserDto(user) } returns userDto

        mockMvc.perform(TestUtil.mockPatchRequest(getUrl(userId), updateUserDto))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect { result ->
                Assertions.assertEquals(Json.stringify(userDto), result.response.contentAsString)
            }
    }

    @Test
    fun givenDtoHasInvalidEmail_whenUpdateUser_thenReturnsStatus400() {
        val userId = 1L
        val updateUserDto = UpdateUserDto(email = "is-this-even-email")

        mockMvc.perform(TestUtil.mockPatchRequest(getUrl(userId), updateUserDto))
            .andExpect(MockMvcResultMatchers.status().isUnprocessableEntity)
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

        mockMvc.perform(TestUtil.mockPatchRequest(getUrl(userId), updateUserDto))
            .andExpect(MockMvcResultMatchers.status().isUnprocessableEntity)
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
        val user = User(
            email = email,
            details = Details(name = name),
            credentials = credentials
        )

        every { service.userByEmailExists(email) } returns false
        every { service.findUserById(userId) } returns user

        mockMvc.perform(TestUtil.mockPatchRequest(getUrl(userId), updateUserDto))
            .andExpect(MockMvcResultMatchers.status().isForbidden)
            .andExpect { result ->
                Assertions.assertTrue(result.resolvedException is ResourceException)
            }
    }

    @Test
    fun givenDtoIsForAbsentUser_whenUpdateUser_thenReturnsStatus404() {
        val absentUserId = 10L
        val email = "mark@mail.com"
        val updateUserDto = UpdateUserDto(email = email)

        every { service.userByEmailExists(email) } returns false
        every { service.findUserById(absentUserId) } returns null

        mockMvc.perform(TestUtil.mockPatchRequest(getUrl(absentUserId), updateUserDto))
            .andExpect(MockMvcResultMatchers.status().isNotFound)
            .andExpect { result ->
                Assertions.assertTrue(result.resolvedException is ResourceException)
            }
    }

    @Test
    fun givenDtoHasEmailThatAlreadyExists_whenUpdateUser_thenReturnsStatus409() {
        val userId = 1L
        val existingEmail = "already-exists@mail.com"
        val updateUserDto = UpdateUserDto(email = existingEmail)

        every { service.userByEmailExists(existingEmail) } returns true

        mockMvc.perform(TestUtil.mockPatchRequest(getUrl(userId), updateUserDto))
            .andExpect(MockMvcResultMatchers.status().isConflict)
            .andExpect { result ->
                Assertions.assertTrue(result.resolvedException is ResourceException)
            }
    }
}

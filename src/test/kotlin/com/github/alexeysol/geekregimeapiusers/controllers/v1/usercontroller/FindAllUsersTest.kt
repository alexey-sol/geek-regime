package com.github.alexeysol.geekregimeapiusers.controllers.v1.usercontroller

import com.github.alexeysol.geekregimeapicommons.models.dtos.UserDto
import com.github.alexeysol.geekregimeapicommons.utils.TestUtils
import com.github.alexeysol.geekregimeapicommons.utils.converters.PageableConverter
import com.github.alexeysol.geekregimeapiusers.testutils.createUserDto
import com.github.alexeysol.geekregimeapiusers.models.entities.User
import com.github.alexeysol.geekregimeapiusers.utils.sources.ApiUsersSource
import io.mockk.every
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers

class FindAllUsersTest(
    @Autowired mockMvc: MockMvc,
    @Autowired source: ApiUsersSource
) : BaseUserControllerTest(mockMvc, source) {
    private val pageableConverterStub = PageableConverter("", "")
    private val pageableStub = pageableConverterStub.pageable

    @Test
    fun allUsersExist_whenFindAllUsers_thenReturnsUserDtoListWithStatus200() {
        val users = listOf(User(), User())
        val userPage: Page<User> = PageImpl(users, pageableStub, users.size.toLong())

        val userDtoList = listOf(UserDto(), UserDto())
        val userDtoPage = PageImpl(userDtoList, pageableStub, userDtoList.size.toLong());

        every { service.findAllUsers(pageableStub) } returns userPage
        every { mapper.fromUserListToUserDtoList(users) } returns userDtoList

        mockMvc.perform(MockMvcRequestBuilders.get(apiV1Path))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isArray)
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isNotEmpty)
            .andExpect { result ->
                TestUtils.responseContentEqualsProvidedPage(userDtoPage, result.response.contentAsString)
            }
    }

    @Test
    fun usersDontExist_whenFindAllUsers_thenReturnsEmptyListWithStatus200() {
        val emptyList = listOf<User>()
        val emptyPage: Page<User> = PageImpl(emptyList, pageableStub, 0)

        val emptyUserDtoList = listOf<UserDto>()

        every { service.findAllUsers(pageableStub) } returns emptyPage
        every { mapper.fromUserListToUserDtoList(emptyList) } returns emptyUserDtoList

        mockMvc.perform(MockMvcRequestBuilders.get(apiV1Path))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isArray)
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isEmpty)
    }

    @Test
    fun allUsersExist_whenFindAllUsersById_thenReturnsUserDtoListWithStatus200() {
        val userId = 1L
        val userId2 = 2L
        val userIds = listOf(userId, userId2)

        val users = listOf(User(id = userId), User(id = userId2))
        val userPage: Page<User> = PageImpl(users, pageableStub, users.size.toLong())

        val userDtoList = listOf(createUserDto(id = userId), createUserDto(id = userId2))
        val userDtoPage = PageImpl(userDtoList, pageableStub, userDtoList.size.toLong());

        every { service.findAllUsersById(userIds, pageableStub) } returns userPage
        every { mapper.fromUserListToUserDtoList(users) } returns userDtoList

        val requestBuilder = MockMvcRequestBuilders.get(apiV1Path)
            .queryParam("ids", userId.toString(), userId2.toString())
        mockMvc.perform(requestBuilder)
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isArray)
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isNotEmpty)
            .andExpect { result ->
                TestUtils.responseContentEqualsProvidedPage(userDtoPage, result.response.contentAsString)
            }
    }

    @Test
    fun fewUsersExist_whenFindAllUsersById_thenReturnsUserDtoListWithStatus200() {
        val userId = 1L
        val absentUserId = 10L
        val absentUserId2 = 11L
        val userIds = listOf(userId, absentUserId, absentUserId2)

        val users = listOf(User(id = userId))
        val userPage: Page<User> = PageImpl(users, pageableStub, users.size.toLong())

        val userDtoList = listOf(createUserDto(id = userId))
        val userDtoPage = PageImpl(userDtoList, pageableStub, userDtoList.size.toLong());

        every { service.findAllUsersById(userIds, pageableStub) } returns userPage
        every { mapper.fromUserListToUserDtoList(users) } returns userDtoList

        val requestBuilder = MockMvcRequestBuilders.get(apiV1Path)
            .queryParam("ids", userId.toString(), absentUserId.toString(), absentUserId2.toString())
        mockMvc.perform(requestBuilder)
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isArray)
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isNotEmpty)
            .andExpect { result ->
                TestUtils.responseContentEqualsProvidedPage(userDtoPage, result.response.contentAsString)
            }
    }

    @Test
    fun usersDontExist_whenFindAllUsersById_thenReturnsEmptyListWithStatus200() {
        val absentUserId = 10L
        val absentUserId2 = 11L
        val userIds = listOf(absentUserId, absentUserId2)

        val emptyList = listOf<User>()
        val emptyPage: Page<User> = PageImpl(emptyList, pageableStub, 0)

        val emptyUserDtoList = listOf<UserDto>()

        every { service.findAllUsersById(userIds, pageableStub) } returns emptyPage
        every { mapper.fromUserListToUserDtoList(emptyList) } returns emptyUserDtoList

        val requestBuilder = MockMvcRequestBuilders.get(apiV1Path)
            .queryParam("ids", absentUserId.toString(), absentUserId2.toString())
        mockMvc.perform(requestBuilder)
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isArray)
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isEmpty)
    }
}

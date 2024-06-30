package com.github.alexeysol.geekregime.apiusers.controller.v1.usercontroller

import com.github.alexeysol.geekregime.apicommons.constant.Default.PAGE_SIZE
import com.github.alexeysol.geekregime.apicommons.generated.model.UserPageResponse
import com.github.alexeysol.geekregime.apicommons.generated.model.UserResponse
import com.github.alexeysol.geekregime.apicommons.util.parser.Json
import com.github.alexeysol.geekregime.apiusers.model.entity.User
import io.mockk.every
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers

class FindAllUsersTest(@Autowired mockMvc: MockMvc) : BaseUserControllerTest(mockMvc) {
    private val pageableStub = Pageable.ofSize(PAGE_SIZE)

    @Test
    fun allUsersExist_whenFindAllUsers_thenReturnsPageResponseWithStatus200() {
        val users = listOf(User(details = defaultDetails), User(details = defaultDetails))
        val userPage: Page<User> = PageImpl(users, pageableStub, users.size.toLong())

        val userResponses = listOf(UserResponse(), UserResponse())
        val userPageResponse = UserPageResponse(userResponses, userPage.size, userPage.totalElements);

        every { service.findAllUsers(ofType(Pageable::class)) } returns userPage
        every { mapper.toUserListResponse(users) } returns userResponses

        mockMvc.perform(MockMvcRequestBuilders.get(getUrl()))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isArray)
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isNotEmpty)
            .andExpect { result ->
                run {
                    val contentAsString = result.response.contentAsString
                    Assertions.assertEquals(Json.stringify(userPageResponse), contentAsString)
                }
            }
    }

    @Test
    fun usersDontExist_whenFindAllUsers_thenReturnsEmptyPageResponseWithStatus200() {
        val emptyList = listOf<User>()
        val emptyPage: Page<User> = PageImpl(emptyList, pageableStub, 0)

        val emptyUserResponses = listOf<UserResponse>()

        every { service.findAllUsers(ofType(Pageable::class)) } returns emptyPage
        every { mapper.toUserListResponse(emptyList) } returns emptyUserResponses

        mockMvc.perform(MockMvcRequestBuilders.get(getUrl()))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isArray)
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isEmpty)
    }

    @Test
    fun allUsersExist_whenFindAllUsersById_thenReturnsPageResponseWithStatus200() {
        val userId = 1L
        val userId2 = 2L
        val userIds = listOf(userId, userId2)

        val users = listOf(
            User(id = userId, details = defaultDetails),
            User(id = userId2, details = defaultDetails)
        )
        val userPage: Page<User> = PageImpl(users, pageableStub, users.size.toLong())

        val userResponse = UserResponse.builder()
            .id(userId)
            .build()
        val userResponse2 = UserResponse.builder()
            .id(userId2)
            .build()
        val userResponses = listOf(userResponse, userResponse2)
        val userPageResponse = UserPageResponse(userResponses, userPage.size, userPage.totalElements)

        every { service.findAllUsersById(userIds, ofType(Pageable::class)) } returns userPage
        every { mapper.toUserListResponse(users) } returns userResponses

        val requestBuilder = MockMvcRequestBuilders.get(getUrl())
            .queryParam("ids", userId.toString(), userId2.toString())
        mockMvc.perform(requestBuilder)
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isArray)
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isNotEmpty)
            .andExpect { result ->
                run {
                    val contentAsString = result.response.contentAsString
                    Assertions.assertEquals(Json.stringify(userPageResponse), contentAsString)
                }
            }
    }

    @Test
    fun fewUsersExist_whenFindAllUsersById_thenReturnsPageResponseWithStatus200() {
        val userId = 1L
        val absentUserId = 10L
        val absentUserId2 = 11L
        val userIds = listOf(userId, absentUserId, absentUserId2)

        val users = listOf(User(id = userId, details = defaultDetails))
        val userPage: Page<User> = PageImpl(users, pageableStub, users.size.toLong())

        val userResponse = UserResponse.builder()
            .id(userId)
            .build()
        val userResponses = listOf(userResponse)
        val userPageResponse = UserPageResponse(userResponses, userPage.size, userPage.totalElements)

        every { service.findAllUsersById(userIds, ofType(Pageable::class)) } returns userPage
        every { mapper.toUserListResponse(users) } returns userResponses

        val requestBuilder = MockMvcRequestBuilders.get(getUrl())
            .queryParam("ids", userId.toString(), absentUserId.toString(), absentUserId2.toString())
        mockMvc.perform(requestBuilder)
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isArray)
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isNotEmpty)
            .andExpect { result ->
                run {
                    val contentAsString = result.response.contentAsString
                    Assertions.assertEquals(Json.stringify(userPageResponse), contentAsString)
                }
            }
    }

    @Test
    fun usersDontExist_whenFindAllUsersById_thenReturnsEmptyPageResponseWithStatus200() {
        val absentUserId = 10L
        val absentUserId2 = 11L
        val userIds = listOf(absentUserId, absentUserId2)

        val emptyList = listOf<User>()
        val emptyPage: Page<User> = PageImpl(emptyList, pageableStub, 0)

        val emptyUserResponseList = listOf<UserResponse>()

        every { service.findAllUsersById(userIds, ofType(Pageable::class)) } returns emptyPage
        every { mapper.toUserListResponse(emptyList) } returns emptyUserResponseList

        val requestBuilder = MockMvcRequestBuilders.get(getUrl())
            .queryParam("ids", absentUserId.toString(), absentUserId2.toString())
        mockMvc.perform(requestBuilder)
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isArray)
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isEmpty)
    }
}

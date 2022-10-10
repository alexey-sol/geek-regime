package com.github.alexeysol.geekregimeapiusers.controllers.v1.usercontroller

import com.github.alexeysol.geekregimeapiusers.constants.PathConstants
import com.github.alexeysol.geekregimeapiusers.services.v1.UserService
import com.github.alexeysol.geekregimeapiusers.utils.mappers.UserMapper
import com.github.alexeysol.geekregimeapiusers.utils.sources.ApiUsersSource
import com.ninjasquad.springmockk.MockkBean
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc

internal const val VALIDATION_FAILED_MESSAGE = "Validation failed"

@SpringBootTest
@AutoConfigureMockMvc
abstract class BaseUserControllerTest(
    protected val mockMvc: MockMvc,
    source: ApiUsersSource
) {
    @MockkBean
    lateinit var service: UserService

    @MockkBean
    lateinit var mapper: UserMapper

    protected val apiV1Path = source.getApiPath(PathConstants.V1)

    protected fun getUrl(): String = apiV1Path

    protected fun getUrl(id: Long): String = String.format("%s/%d", apiV1Path, id)
}

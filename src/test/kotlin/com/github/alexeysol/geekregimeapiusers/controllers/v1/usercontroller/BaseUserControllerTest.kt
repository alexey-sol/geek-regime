package com.github.alexeysol.geekregimeapiusers.controllers.v1.usercontroller

import com.github.alexeysol.geekregimeapiusers.constants.PathConstants as Constants
import com.github.alexeysol.geekregimeapiusers.sources.ApiUsersSourceResolver
import com.github.alexeysol.geekregimeapiusers.services.v1.UserService
import com.ninjasquad.springmockk.MockkBean
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc

internal const val VALIDATION_FAILED_MESSAGE = "Validation failed"

@SpringBootTest
@AutoConfigureMockMvc
abstract class BaseUserControllerTest(
    val mockMvc: MockMvc,
    sourceResolver: ApiUsersSourceResolver
) {
    @MockkBean
    lateinit var service: UserService

    protected val apiV1Path = sourceResolver.getApiPath(Constants.V1)
}

package com.github.alexsol.geekregimeapiusers.controllers.v1.usercontroller

import com.github.alexsol.geekregimeapiusers.ApiUsersSourceResolver
import com.github.alexsol.geekregimeapiusers.services.v1.UserService
import com.ninjasquad.springmockk.MockkBean
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc

internal const val VALIDATION_FAILED_MESSAGE = "Validation failed"

@SpringBootTest
@AutoConfigureMockMvc
abstract class BaseUserControllerTest(
    @Autowired final val mockMvc: MockMvc,
    @Autowired final val sourceResolver: ApiUsersSourceResolver
) {
    @MockkBean
    lateinit var service: UserService

    protected val apiV1Path = sourceResolver.getApiPath(1)
}

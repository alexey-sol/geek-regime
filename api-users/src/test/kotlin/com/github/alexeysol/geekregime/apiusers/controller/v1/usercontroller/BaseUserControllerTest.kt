package com.github.alexeysol.geekregime.apiusers.controller.v1.usercontroller

import com.github.alexeysol.geekregime.apicommons.constant.ResourceConstant.USERS
import com.github.alexeysol.geekregime.apiusers.constant.PathConstant.API_PREFIX_V1
import com.github.alexeysol.geekregime.apiusers.mapper.UserMapper
import com.github.alexeysol.geekregime.apiusers.model.entity.Details
import com.github.alexeysol.geekregime.apiusers.service.v1.UserService
import com.ninjasquad.springmockk.MockkBean
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc

internal const val VALIDATION_FAILED_MESSAGE = "Validation failed"

@SpringBootTest
@AutoConfigureMockMvc
abstract class BaseUserControllerTest(protected val mockMvc: MockMvc) {
    private val apiPathV1 = "$API_PREFIX_V1/$USERS"

    @MockkBean
    lateinit var service: UserService

    @MockkBean
    lateinit var mapper: UserMapper

    protected val defaultDetails = Details(name = "Mr Noname")

    protected fun getUrl(): String = "/$apiPathV1"

    protected fun getUrl(id: Long): String = String.format("%s/%d", getUrl(), id)

    protected fun getUrl(email: String): String = String.format("%s/%s", getUrl(), email)
}

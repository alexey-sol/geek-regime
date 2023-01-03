package com.github.alexeysol.geekregime.apiusers.models.dtos

import javax.validation.constraints.Email
import javax.validation.constraints.NotEmpty

data class AuthDto(
    @field:NotEmpty(message = "Email is required and must not be blank")
    @field:Email(message = "Email must have valid format")
    val email: String? = null,

    @field:NotEmpty(message = "Password is required and must not be blank")
    val password: String? = null,
)

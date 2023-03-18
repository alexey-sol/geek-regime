package com.github.alexeysol.geekregime.apiusers.models.dtos

import javax.validation.Valid
import javax.validation.constraints.Email
import javax.validation.constraints.NotEmpty
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

data class CreateUserDto(
    @field:NotEmpty(message = "Email is required and must not be blank")
    @field:Email(message = "Email must have valid format")
    val email: String = "", // [1]

    @field:Size(min = 1, message = "Password must not be blank")
    val password: String? = null,

    @field:NotNull(message = "Details is required")
    @field:Valid
    val details: CreateDetailsDto?,
)

// [1]. If the value isn't initialized, NotNull/NotEmpty validation won't work:
// default null check exception will be thrown first.

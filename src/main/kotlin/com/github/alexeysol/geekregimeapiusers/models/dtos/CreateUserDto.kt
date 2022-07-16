package com.github.alexeysol.geekregimeapiusers.models.dtos

import com.github.alexeysol.geekregimeapiusers.models.entities.User
import javax.validation.Valid
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

data class CreateUserDto(
    @field:NotNull(message = "User data is required")
    @field:Valid
    val user: User,

    @field:Size(min = 1, message = "Password must not be blank")
    val password: String? = null
)

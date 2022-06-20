package com.github.alexsol.geekregimeapiusers.dtos

import com.github.alexsol.geekregimeapiusers.entities.User
import com.github.alexsol.geekregimeapiusers.entities.Details
import javax.validation.Valid
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

data class CreateUserDto(
    @field:Valid
    @field:NotNull(message = "User data is required")
    val user: User,

    @field:Valid
    val details: Details? = null,

    @field:Size(min = 1, message = "Password must not be blank")
    val password: String? = null
)

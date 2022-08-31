package com.github.alexeysol.geekregimeapiusers.models.dtos

import javax.validation.Valid
import javax.validation.constraints.AssertTrue
import javax.validation.constraints.Email
import javax.validation.constraints.NotEmpty
import javax.validation.constraints.Size

data class CreateUserDto(
    @field:NotEmpty(message = "Email is required and must not be blank")
    @field:Email(message = "Email must have valid format")
    val email: String = "", // [1]

    @field:Size(min = 1, message = "Password must not be blank")
    val password: String? = null,

    @field:Size(min = 1, message = "Confirm password must not be blank")
    val confirmPassword: String? = null,

    @field:Valid
    val details: CreateOrUpdateDetailsDto? = null,
) {
    @AssertTrue(message = "Password and confirm password must match")
    private fun isValid(): Boolean {
        return password == confirmPassword // if there are both null, that's alright too
    }
}

// [1]. If the value isn't initialized, NotNull/NotEmpty validation won't work:
// default null check exception will be thrown first.

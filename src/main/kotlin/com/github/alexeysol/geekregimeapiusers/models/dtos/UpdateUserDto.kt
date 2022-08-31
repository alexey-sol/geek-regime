package com.github.alexeysol.geekregimeapiusers.models.dtos

import javax.validation.Valid
import javax.validation.constraints.AssertTrue
import javax.validation.constraints.Email
import javax.validation.constraints.Size


data class UpdateUserDto(
    @field:Size(min = 1, message = "Email must not be blank")
    @field:Email(message = "Email must have valid format")
    val email: String? = null,

    @field:Size(min = 1, message = "Old password must not be blank")
    val oldPassword: String? = null,

    @field:Size(min = 1, message = "New password must not be blank")
    val newPassword: String? = null,

    @field:Valid
    val details: CreateOrUpdateDetailsDto? = CreateOrUpdateDetailsDto(),
) {
    @AssertTrue(message = "Old password and new password may not go separately")
    private fun isValid(): Boolean {
        oldPassword ?: newPassword ?: return true

        return oldPassword != null && newPassword != null
    }
}

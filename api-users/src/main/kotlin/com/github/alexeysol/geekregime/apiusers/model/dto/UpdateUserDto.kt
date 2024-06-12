package com.github.alexeysol.geekregime.apiusers.model.dto

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
    val details: UpdateDetailsDto? = UpdateDetailsDto(),
) {
    @AssertTrue(message = "If old password is provided, new password is required")
    private fun isValid(): Boolean {
        oldPassword ?: newPassword ?: return true

        return newPassword != null;
    }
}

package com.github.alexeysol.geekregimeapiusers.models.dtos

import com.github.alexeysol.geekregimeapicommons.constants.Gender
import javax.validation.constraints.Size

data class CreateOrUpdateDetailsDto(
    @field:Size(min = 1, message = "Name must not be blank")
    val name: String? = null,

    @field:Size(min = 1, message = "Image must not be blank")
    val image: String? = null,

    val gender: Gender? = null,
)

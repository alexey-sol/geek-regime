package com.github.alexeysol.geekregime.apiusers.models.dtos

import com.github.alexeysol.geekregime.apicommons.constants.Gender
import javax.validation.constraints.Size

data class UpdateDetailsDto(
    @field:Size(min = 1, message = "Name must not be blank")
    val name: String? = null,

    @field:Size(min = 1, message = "Image must not be blank")
    val image: String? = null,

    val gender: Gender? = null,
)

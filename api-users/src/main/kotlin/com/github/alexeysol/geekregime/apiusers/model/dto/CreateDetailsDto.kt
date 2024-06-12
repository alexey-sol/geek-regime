package com.github.alexeysol.geekregime.apiusers.model.dto

import com.github.alexeysol.geekregime.apicommons.constant.Gender
import javax.validation.constraints.NotEmpty
import javax.validation.constraints.Size

data class CreateDetailsDto(
    @field:NotEmpty(message = "Name is required and must not be blank")
    val name: String?,

    @field:Size(min = 1, message = "Image must not be blank")
    val image: String? = null,

    val gender: Gender? = null,
)

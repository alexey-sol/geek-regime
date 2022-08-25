package com.github.alexeysol.geekregimeapiusers.models.dtos

import com.github.alexeysol.geekregimeapicommons.constants.Gender

data class DetailsDto(
    var name: String? = null,
    var image: String? = null,
    var gender: Gender? = null,
)

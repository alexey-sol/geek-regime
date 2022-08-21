package com.github.alexeysol.geekregimeapiusers.models.dtos

import com.github.alexeysol.geekregimeapiusers.models.Gender

data class DetailsDto(
    var name: String? = null,
    var image: String? = null,
    var gender: Gender? = null,
)

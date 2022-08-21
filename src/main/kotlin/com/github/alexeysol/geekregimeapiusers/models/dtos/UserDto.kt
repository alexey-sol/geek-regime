package com.github.alexeysol.geekregimeapiusers.models.dtos

import java.time.Instant

data class UserDto(
    var id: Long = 0L,
    var email: String = "",
    var createdAt: Instant = Instant.now(),
    var updatedAt: Instant = Instant.now(),
    var details: DetailsDto? = null,
)

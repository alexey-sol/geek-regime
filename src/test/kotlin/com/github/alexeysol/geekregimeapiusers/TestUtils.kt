package com.github.alexeysol.geekregimeapiusers

import com.github.alexeysol.geekregimeapicommons.constants.Gender
import com.github.alexeysol.geekregimeapicommons.models.dtos.UserDetailsDto
import com.github.alexeysol.geekregimeapicommons.models.dtos.UserDto
import java.util.*

fun createUserDto(
    id: Long = 0L,
    email: String? = null,
    createdAt: Date? = null,
    updatedAt: Date? = null,
    details: UserDetailsDto? = null
): UserDto = UserDto(id, email, createdAt, updatedAt, details)

fun createUserDetailsDto(
    name: String? = null,
    image: String? = null,
    gender: Gender? = null,
    createdAt: Date? = null,
    updatedAt: Date? = null
): UserDetailsDto = UserDetailsDto(name, image, gender, createdAt, updatedAt)

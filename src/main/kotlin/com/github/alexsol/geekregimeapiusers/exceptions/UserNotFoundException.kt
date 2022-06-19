package com.github.alexsol.geekregimeapiusers.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(value = HttpStatus.NOT_FOUND)
class UserNotFoundException(private val userId: Int? = null) : RuntimeException() {
    private val idInfoIfAvailable = if (userId == null) "" else ", provided id = $userId"

    override val message: String
        get() = "User not found%s".format(idInfoIfAvailable)
}

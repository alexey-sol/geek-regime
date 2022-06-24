package com.github.alexeysol.geekregimeapiusers.exceptions

import com.github.alexeysol.geekregimeapiusers.constants.ExceptionMessageConstants as Constants
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(value = HttpStatus.NOT_FOUND)
class UserNotFoundException(
    message: String? = Constants.USER_NOT_FOUND,
    userId: Int? = null
) : BaseApiUsersException(
    message = message,
    invalidKeyValuePair = userId?.let{ Pair("id", userId.toString()) }
)

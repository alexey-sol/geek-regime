package com.github.alexeysol.geekregimeapiusers.exceptions

import com.github.alexeysol.geekregimeapiusers.constants.ExceptionMessageConstants as Constants
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(value = HttpStatus.CONFLICT)
class UserAlreadyExistsException(
    message: String? = Constants.USER_ALREADY_EXISTS,
    email: String? = null
) : BaseApiUsersException(
    message = message,
    invalidKeyValuePair = email?.let{ Pair("email", email) }
)

package com.github.alexeysol.geekregimeapiusers.utils

import com.github.alexeysol.geekregimeapicommons.constants.ApiResource
import com.github.alexeysol.geekregimeapicommons.constants.DefaultValueConstants
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceForbiddenException
import com.github.alexeysol.geekregimeapicommons.models.Pair
import com.github.alexeysol.geekregimeapiusers.models.entities.Credentials

fun assertPasswordsMatchIfNeeded(
    oldPassword: String?,
    newPassword: String?,
    oldCredentials: Credentials?
) {
    try {
        checkNotNull(oldCredentials)
        checkNotNull(oldPassword)
        checkNotNull(newPassword)

        if (!passwordsMatch(oldPassword, oldCredentials)) {
            throw ResourceForbiddenException(
                ApiResource.USER,
                Pair("oldPassword", DefaultValueConstants.MASKED_VALUE)
            )
        }
    } catch (_: IllegalStateException) {
        // No credentials nor passwords provided, that's fine. Ignore.
    }
}

private fun passwordsMatch(password: String, oldCredentials: Credentials): Boolean {
    val newHash = Security.generateHash(password, oldCredentials.salt)
    val oldHash = oldCredentials.hashedPassword
    return newHash.contentEquals(oldHash)
}

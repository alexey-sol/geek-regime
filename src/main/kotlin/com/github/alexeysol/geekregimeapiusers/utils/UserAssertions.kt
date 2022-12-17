package com.github.alexeysol.geekregimeapiusers.utils

import com.github.alexeysol.geekregimeapiusers.models.entities.Credentials

fun assertPasswordsMatchIfNeeded(
    oldPassword: String?,
    newPassword: String?,
    oldCredentials: Credentials?
) {
    try {
        checkNotNull(oldCredentials)
        checkNotNull(newPassword)

        if (!passwordsMatch(oldPassword, oldCredentials)) {
            throw IllegalArgumentException()
        }
    } catch (_: IllegalStateException) {
        // No check needed because there's either:
        // 1) no existing password at all (the user signed up using OAuth);
        // 2) no intention to update password.
    }
}

private fun passwordsMatch(password: String?, oldCredentials: Credentials): Boolean {
    if (password === null) {
        return false
    }

    val newHash = Security.generateHash(password, oldCredentials.salt)
    val oldHash = oldCredentials.hashedPassword
    return newHash.contentEquals(oldHash)
}

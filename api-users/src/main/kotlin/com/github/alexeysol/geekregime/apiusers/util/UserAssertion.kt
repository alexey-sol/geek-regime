package com.github.alexeysol.geekregime.apiusers.util

import com.github.alexeysol.geekregime.apiusers.model.entity.Credentials

fun assertPassword(password: String?, credentials: Credentials?) {
    if (password === null || credentials === null || !passwordsMatch(password, credentials)) {
        throw IllegalArgumentException();
    }
}

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

private fun passwordsMatch(password: String?, credentials: Credentials): Boolean {
    if (password === null) {
        return false
    }

    val newHash = SecurityUtil.generateHash(password, credentials.salt)
    val oldHash = credentials.hashedPassword
    return newHash.contentEquals(oldHash)
}

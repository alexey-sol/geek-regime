package com.github.alexeysol.geekregime.apiusers.util.faker

import com.github.alexeysol.geekregime.apiusers.model.entity.Credentials
import com.github.alexeysol.geekregime.apiusers.model.entity.User

object FakeCredentials {
    fun generateCredentials(user: User): Credentials = Credentials(
        hashedPassword = byteArrayOf(),
        salt = byteArrayOf(),
        user = user
    )
}

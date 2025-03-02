package com.github.alexeysol.geekregime.apiusers.util.faker

import com.github.alexeysol.geekregime.apicommons.util.Slug
import com.github.alexeysol.geekregime.apiusers.constant.FakerConstant.EMAIL_DELIMITER
import com.github.alexeysol.geekregime.apiusers.constant.FakerConstant.EMAIL_DOMAIN
import com.github.alexeysol.geekregime.apiusers.constant.FakerConstant.EMPTY
import com.github.alexeysol.geekregime.apiusers.constant.FakerConstant.WHITESPACE
import com.github.alexeysol.geekregime.apiusers.model.entity.User
import java.util.*

private val faker = getFaker()

object FakeUser {
    fun generateUser(userId: Long): User {
        val name = generateName()
        val email = generateEmail(name, userId)

        val user = User(
            email = email,
            slug = generateSlug(name, userId),
            credentials = null,
            details = null
        )

        val credentials = FakeCredentials.generateCredentials(user)
        user.credentials = credentials

        val details = FakeDetails.generateDetails(user, name)
        user.details = details

        return user
    }

    private fun generateName(): String = if (Random().nextBoolean())
        faker.futurama().character() else faker.rickAndMorty().character()

    private fun generateEmail(name: String, userId: Long): String {
        val emailPrefix = name.lowercase()
            .replace(".", EMPTY)
            .replace(",", EMPTY)
            .replace("'", EMPTY)
            .replace("-", WHITESPACE)
            .split(WHITESPACE)
            .joinToString(EMAIL_DELIMITER)

        return "$emailPrefix$EMAIL_DELIMITER$userId$EMAIL_DOMAIN"
    }

    private fun generateSlug(name: String, userId: Long): String = "${Slug.generateSlug(name)}-$userId"
}

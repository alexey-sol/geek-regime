package com.github.alexeysol.geekregime.apiusers.util.faker

import com.github.alexeysol.geekregime.apicommons.constant.Gender
import com.github.alexeysol.geekregime.apiusers.constant.FakerConstant.WHITESPACE
import com.github.alexeysol.geekregime.apiusers.model.entity.Details
import com.github.alexeysol.geekregime.apiusers.model.entity.User

private val faker = getFaker()

object FakeDetails {
    fun generateDetails(user: User, name: String): Details {
        return Details(
            name = name,
            description = generateDescription(),
            about = generateAbout(),
            gender = generateGender(),
            image = generateImage(),
            user = user
        )
    }

    private fun generateDescription(): String = faker.futurama().hermesCatchPhrase()

    private fun generateAbout(): String {
        val paragraphs: MutableList<String> = mutableListOf()

        for (i in 1..getRandomNumber(1, 5)) {
            paragraphs.add(faker.futurama().quote())
        }

        return paragraphs.joinToString(WHITESPACE)
    }

    private fun generateGender(): Gender = if (is50PercentChance()) Gender.MALE else Gender.FEMALE

    private fun generateImage(): String = faker.avatar().image()
}

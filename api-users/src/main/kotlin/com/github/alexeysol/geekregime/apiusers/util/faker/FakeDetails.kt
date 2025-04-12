package com.github.alexeysol.geekregime.apiusers.util.faker

import com.github.alexeysol.geekregime.apicommons.generated.model.Gender
import com.github.alexeysol.geekregime.apiusers.constant.FakerConstant.FIFTY_YEARS_IN_MS
import com.github.alexeysol.geekregime.apiusers.constant.FakerConstant.WHITESPACE
import com.github.alexeysol.geekregime.apiusers.model.entity.Details
import com.github.alexeysol.geekregime.apiusers.model.entity.User
import java.util.*

private val faker = getFaker()

object FakeDetails {
    private val pictureUrls: List<String> = listOf(
        "https://cdn-icons-png.flaticon.com/512/2202/2202112.png",
        "https://cdn-icons-png.flaticon.com/512/4322/4322991.png",
        "https://cdn-icons-png.flaticon.com/512/1999/1999625.png",
        "https://cdn-icons-png.flaticon.com/512/4333/4333609.png",
        "https://cdn-icons-png.flaticon.com/512/4140/4140047.png",
        "https://cdn-icons-png.flaticon.com/512/1326/1326377.png",
        "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
        "https://cdn-icons-png.flaticon.com/512/1154/1154448.png",
        "https://cdn-icons-png.flaticon.com/512/3940/3940403.png",
        "https://cdn-icons-png.flaticon.com/512/3940/3940417.png"
    )

    fun generateDetails(user: User, name: String): Details {
        return Details(
            name = name,
            description = generateDescription(),
            about = generateAbout(),
            gender = generateGender(),
            image = generateImage(),
            birthDate = Date.from(generateCreatedAt(FIFTY_YEARS_IN_MS)),
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

    private fun generateImage(): String? = if (is75PercentChance()) pictureUrls.random() else null
}

package com.github.alexeysol.geekregime.apiusers.util.faker

import com.github.alexeysol.geekregime.apiusers.constant.FakerConstant.FIVE_YEARS_IN_MS
import net.datafaker.Faker
import java.time.Instant
import java.util.*
import java.util.concurrent.TimeUnit

private val faker = Faker()

fun getFaker(): Faker = faker

fun getRandomNumber(min: Int, max: Int): Int = Random().nextInt(max - min) + min

fun generateCreatedAt(): Instant = faker.timeAndDate().past(FIVE_YEARS_IN_MS, TimeUnit.MILLISECONDS)

fun generateUpdatedAt(from: Instant): Instant = faker.timeAndDate().between(from, Instant.now())

fun is50PercentChance(): Boolean = Random().nextBoolean()

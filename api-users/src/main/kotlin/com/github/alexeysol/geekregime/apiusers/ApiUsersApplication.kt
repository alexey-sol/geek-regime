package com.github.alexeysol.geekregime.apiusers

import com.github.alexeysol.geekregime.apicommons.model.properties.AwsProperties
import com.github.alexeysol.geekregime.apicommons.util.storage.CloudObjectStorage
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Import
import org.springframework.data.jpa.repository.config.EnableJpaAuditing

@SpringBootApplication
@Import(value = [AwsProperties::class, CloudObjectStorage::class])
@EnableJpaAuditing
class ApiUsersApplication

fun main(args: Array<String>) {
    runApplication<ApiUsersApplication>(*args)
}

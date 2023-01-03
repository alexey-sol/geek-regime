package com.github.alexeysol.geekregimeapiusers

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.config.EnableJpaAuditing

@SpringBootApplication
@EnableJpaAuditing
class GeekRegimeApiUsersApplication

fun main(args: Array<String>) {
    runApplication<GeekRegimeApiUsersApplication>(*args)
}

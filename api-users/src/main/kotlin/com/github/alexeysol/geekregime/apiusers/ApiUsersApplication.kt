package com.github.alexeysol.geekregime.apiusers

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.config.EnableJpaAuditing

@SpringBootApplication
@EnableJpaAuditing
class ApiUsersApplication

fun main(args: Array<String>) {
    runApplication<ApiUsersApplication>(*args)
}

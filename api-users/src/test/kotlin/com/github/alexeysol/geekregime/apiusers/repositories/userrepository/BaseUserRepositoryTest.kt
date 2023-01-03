package com.github.alexeysol.geekregime.apiusers.repositories.userrepository

import com.github.alexeysol.geekregime.apiusers.configurations.JpaConfiguration
import com.github.alexeysol.geekregime.apiusers.repositories.UserRepository
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestEntityManager
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager
import org.springframework.context.annotation.Import

@DataJpaTest
@AutoConfigureTestDatabase
@AutoConfigureTestEntityManager
@Import(JpaConfiguration::class)
abstract class BaseUserRepositoryTest(
    protected val entityManager: TestEntityManager,
    protected val repository: UserRepository
)

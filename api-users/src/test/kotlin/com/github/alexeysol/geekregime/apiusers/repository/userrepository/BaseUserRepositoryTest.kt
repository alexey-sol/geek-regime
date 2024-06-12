package com.github.alexeysol.geekregime.apiusers.repository.userrepository

import com.github.alexeysol.geekregime.apiusers.config.JpaConfig
import com.github.alexeysol.geekregime.apiusers.repository.UserRepository
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestEntityManager
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager
import org.springframework.context.annotation.Import

@DataJpaTest
@AutoConfigureTestDatabase
@AutoConfigureTestEntityManager
@Import(JpaConfig::class)
abstract class BaseUserRepositoryTest(
    protected val entityManager: TestEntityManager,
    protected val repository: UserRepository
)

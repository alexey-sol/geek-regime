package com.github.alexsol.geekregimeapiusers.repositories.userrepository

import com.github.alexsol.geekregimeapiusers.repositories.UserRepository
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestEntityManager
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager

@DataJpaTest
@AutoConfigureTestDatabase
@AutoConfigureTestEntityManager
abstract class BaseUserRepositoryTest(
    protected val entityManager: TestEntityManager,
    protected val userRepository: UserRepository
)

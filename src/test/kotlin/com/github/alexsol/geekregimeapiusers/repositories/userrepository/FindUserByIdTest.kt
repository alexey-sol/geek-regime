package com.github.alexsol.geekregimeapiusers.repositories.userrepository

import com.github.alexsol.geekregimeapiusers.entities.User
import com.github.alexsol.geekregimeapiusers.repositories.UserRepository
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager

class FindUserByIdTest(
    @Autowired entityManager: TestEntityManager,
    @Autowired userRepository: UserRepository
) : BaseUserRepositoryTest(entityManager, userRepository) {
    @Test
    fun givenUserExists_whenFindUserById_thenReturnsUser() {
        val initialUserId = 1
        val user = User(email = "mark@mail.com")
        entityManager.persist(user)
        entityManager.flush()

        val result = userRepository.findUserById(initialUserId)

        Assertions.assertEquals(user, result)
    }

    @Test
    fun givenUserDoesntExist_whenFindUserById_thenReturnsNull() {
        val nullUserId = 10

        val result = userRepository.findUserById(nullUserId)

        Assertions.assertEquals(null, result)
    }
}

package com.github.alexeysol.geekregimeapiusers.repositories.userrepository

import com.github.alexeysol.geekregimeapiusers.entities.User
import com.github.alexeysol.geekregimeapiusers.repositories.UserRepository
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager

class RemoveUserByIdTest(
    @Autowired entityManager: TestEntityManager,
    @Autowired userRepository: UserRepository
) : BaseUserRepositoryTest(entityManager, userRepository) {
    @Test
    fun givenUserExists_whenRemoveUserById_thenReturnsDeletedRowCount1() {
        val deletedRowCount = 1
        val initialUserId = 1
        val user = User(email = "mark@mail.com")
        entityManager.persist(user)
        entityManager.flush()

        val result = userRepository.removeUserById(initialUserId)

        Assertions.assertEquals(deletedRowCount, result)
    }

    @Test
    fun givenUserDoesntExist_whenRemoveUserById_thenReturnsDeletedRowCount0() {
        val deletedRowCount = 0
        val absentUserId = 10

        val result = userRepository.removeUserById(absentUserId)

        Assertions.assertEquals(deletedRowCount, result)
    }
}

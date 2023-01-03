package com.github.alexeysol.geekregime.apiusers.repositories.userrepository

import com.github.alexeysol.geekregime.apiusers.models.entities.Details
import com.github.alexeysol.geekregime.apiusers.models.entities.User
import com.github.alexeysol.geekregime.apiusers.repositories.UserRepository
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager

class RemoveUserByIdTest(
    @Autowired entityManager: TestEntityManager,
    @Autowired repository: UserRepository
) : BaseUserRepositoryTest(entityManager, repository) {
    @Test
    fun givenUserExists_whenRemoveUserById_thenReturnsDeletedRowCount1() {
        val deletedRowCount = 1
        val details = Details(name = "Mark")
        val user = User(email = "mark@mail.com", details = details)
        details.setUser(user)
        entityManager.persist(user)
        entityManager.flush()

        val result = repository.removeUserById(user.id!!)
        Assertions.assertEquals(deletedRowCount, result)
    }

    @Test
    fun givenUserDoesntExist_whenRemoveUserById_thenReturnsDeletedRowCount0() {
        val deletedRowCount = 0
        val absentUserId = 10L

        val result = repository.removeUserById(absentUserId)
        Assertions.assertEquals(deletedRowCount, result)
    }
}

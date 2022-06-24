package com.github.alexeysol.geekregimeapiusers.repositories.userrepository

import com.github.alexeysol.geekregimeapiusers.entities.User
import com.github.alexeysol.geekregimeapiusers.repositories.UserRepository
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager

class FindAllUsersTest(
    @Autowired entityManager: TestEntityManager,
    @Autowired userRepository: UserRepository
) : BaseUserRepositoryTest(entityManager, userRepository) {
    @Test
    fun usersExist_whenFindAllUsers_thenReturnsUserList() {
        val user1 = User(email = "mark@mail.com")
        val user2 = User(email = "boobuntu@mail.com")
        val users = listOf(user1, user2)
        entityManager.persist(user1)
        entityManager.persist(user2)
        entityManager.flush()

        val result = userRepository.findAllUsers()

        Assertions.assertEquals(users, result)
    }

    @Test
    fun usersDontExist_whenFindAllUsers_thenReturnsEmptyList() {
        val emptyList = listOf<User>()

        val result = userRepository.findAllUsers()

        Assertions.assertEquals(emptyList, result)
    }
}

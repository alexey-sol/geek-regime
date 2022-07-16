package com.github.alexeysol.geekregimeapiusers.repositories

import com.github.alexeysol.geekregimeapiusers.models.entities.User
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import javax.transaction.Transactional

@Repository
interface UserRepository : CrudRepository<User, Long> {
    @Query("DELETE FROM User u WHERE u.id = :id")
    @Transactional
    @Modifying
    fun removeUserById(id: Long): Int

    fun existsUserByEmail(email: String): Boolean
}

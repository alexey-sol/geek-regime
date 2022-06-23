package com.github.alexsol.geekregimeapiusers.repositories

import com.github.alexsol.geekregimeapiusers.entities.User
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import javax.transaction.Transactional

@Repository
interface UserRepository : CrudRepository<User, Int> {
    @Query("SELECT u FROM User u")
    fun findAllUsers(): List<User>

    fun existsUserByEmail(email: String): Boolean

    @Query("DELETE FROM User u WHERE u.id = :id")
    @Transactional
    @Modifying
    fun removeUserById(id: Int): Int
}

package com.github.alexsol.geekregimeapiusers.repositories

import com.github.alexsol.geekregimeapiusers.entities.User
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import javax.transaction.Transactional

interface UserRepository : CrudRepository<User, Int> {
    @Query("SELECT u FROM User u")
    fun findAllUsers(): List<User>

    @Query("SELECT u FROM User u WHERE u.id = :id")
    fun findUserById(id: Int): User?

    @Query("DELETE FROM User u WHERE u.id = :id")
    @Transactional
    @Modifying
    fun removeUserById(id: Int): Int
}

package com.github.alexsol.geekregimeapiusers.repositories

import com.github.alexsol.geekregimeapiusers.constants.DatabaseConstants as Constants
import com.github.alexsol.geekregimeapiusers.entities.User
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository

interface UserRepository : CrudRepository<User, Int> {
    @Query("SELECT * FROM ${Constants.USER_TABLE}", nativeQuery = true)
    fun findAllUsers(): List<User>

    @Query("SELECT * FROM ${Constants.USER_TABLE} WHERE id = :id", nativeQuery = true)
    fun findUserById(id: Int): User?

    @Query("DELETE FROM ${Constants.USER_TABLE} WHERE id = :id RETURNING id", nativeQuery = true)
    fun removeUserById(id: Int): Int
}

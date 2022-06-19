package com.github.alexsol.geekregimeapiusers.repositories

import com.github.alexsol.geekregimeapiusers.constants.DatabaseConstants as Constants
import com.github.alexsol.geekregimeapiusers.entities.User
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository

interface UserRepository : CrudRepository<User, String> {
    @Query("SELECT * FROM ${Constants.SCHEMA}.${Constants.USER_TABLE}", nativeQuery = true)
    fun findUsers(): List<User>
}

package com.github.alexsol.geekregimeapiusers.services.v1

import com.github.alexsol.geekregimeapiusers.entities.User
import com.github.alexsol.geekregimeapiusers.repositories.UserRepository
import org.springframework.stereotype.Service

@Service
class UserService(val db: UserRepository) {
    fun findAllUsers(): List<User> = db.findAllUsers()

    fun findUserById(id: Int): User? = db.findUserById(id)

    fun createUser(userDto: User): User = db.save(userDto)
}

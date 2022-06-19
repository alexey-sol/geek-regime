package com.github.alexsol.geekregimeapiusers.services.v1

import com.github.alexsol.geekregimeapiusers.entities.User
import com.github.alexsol.geekregimeapiusers.repositories.UserRepository
import org.springframework.stereotype.Service

@Service
class UserService(val db: UserRepository) {
    fun findUsers(): List<User> = db.findUsers()

    fun createUser(user: User){
        db.save(user)
    }
}

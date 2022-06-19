package com.github.alexsol.geekregimeapiusers.controllers.v1

import com.github.alexsol.geekregimeapiusers.constants.PathConstants as Constants
import com.github.alexsol.geekregimeapiusers.entities.User
import com.github.alexsol.geekregimeapiusers.exceptions.UserNotFoundException
import com.github.alexsol.geekregimeapiusers.services.v1.UserService
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@RestController
@RequestMapping(
    path = [Constants.V1_COMMON_PATH],
    produces = ["application/json"]
)
@Validated
class UserController(val service: UserService) {
    @GetMapping
    fun getAllUsers(): List<User> = service.findAllUsers()

    @GetMapping("{id}")
    @Throws(UserNotFoundException::class)
    fun getUserById(@PathVariable id: Int): User? = service.findUserById(id)
        ?: throw UserNotFoundException(id)

    @PostMapping
    fun postUser(@RequestBody @Valid userDto: User): User = service.createUser(userDto)
}

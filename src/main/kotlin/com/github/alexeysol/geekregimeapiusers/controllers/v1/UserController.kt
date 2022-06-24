package com.github.alexeysol.geekregimeapiusers.controllers.v1

import com.github.alexeysol.geekregimeapiusers.dtos.CreateUserDto
import com.github.alexeysol.geekregimeapiusers.constants.PathConstants as Constants
import com.github.alexeysol.geekregimeapiusers.entities.User
import com.github.alexeysol.geekregimeapiusers.exceptions.UserAlreadyExistsException
import com.github.alexeysol.geekregimeapiusers.exceptions.UserNotFoundException
import com.github.alexeysol.geekregimeapiusers.services.v1.UserService
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@RestController
@RequestMapping(
    path = [Constants.API_V1_PATH],
    produces = ["application/json"]
)
@Validated
class UserController(val service: UserService) {
    @GetMapping
    fun getAllUsers(): List<User> = service.findAllUsers()

    @GetMapping("{id}")
    @Throws(UserNotFoundException::class)
    fun getUserById(@PathVariable id: Int): User? = service.findUserById(id)
        ?: throw UserNotFoundException(userId = id)

    @PostMapping
    @Throws(UserAlreadyExistsException::class)
    fun postUser(@RequestBody @Valid dto: CreateUserDto): User {
        val email = dto.user.email

        if (service.userAlreadyExists(email)) {
            throw UserAlreadyExistsException(email = email)
        }

        return service.createUser(dto)
    }

    @DeleteMapping("{id}")
    @Throws(UserNotFoundException::class)
    fun deleteUserById(@PathVariable id: Int): Int? = service.removeUserById(id)
        ?: throw UserNotFoundException(userId = id)
}

package com.github.alexeysol.geekregimeapiusers.controllers.v1

import com.github.alexeysol.geekregimeapicommons.exceptions.BaseResourceException
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceAlreadyExistsException
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceNotFoundException
import com.github.alexeysol.geekregimeapicommons.models.ApiResource
import com.github.alexeysol.geekregimeapicommons.models.Pair
import com.github.alexeysol.geekregimeapiusers.models.dtos.CreateUserDto
import com.github.alexeysol.geekregimeapiusers.constants.PathConstants as Constants
import com.github.alexeysol.geekregimeapiusers.models.entities.User
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
    fun getAllUsers(@RequestParam ids: List<Long>?): Iterable<User> =
        if (ids === null) service.findAllUsers()
        else service.findAllUsersById(ids)

    @GetMapping("{id}")
    @Throws(BaseResourceException::class)
    fun getUserById(@PathVariable id: Long): User? = service.findUserById(id)
        ?: throw ResourceNotFoundException(ApiResource.USER, id)

    @PostMapping
    @Throws(BaseResourceException::class)
    fun postUser(@RequestBody @Valid dto: CreateUserDto): User {
        val email = dto.user.email

        if (service.userAlreadyExists(email)) {
            throw ResourceAlreadyExistsException(ApiResource.USER, Pair("email", email))
        }

        return service.createUser(dto)
    }

    @DeleteMapping("{id}")
    @Throws(BaseResourceException::class)
    fun deleteUserById(@PathVariable id: Long): Long? = service.removeUserById(id)
        ?: throw ResourceNotFoundException(ApiResource.USER, id)
}

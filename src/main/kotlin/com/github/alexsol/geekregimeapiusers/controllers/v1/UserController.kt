package com.github.alexsol.geekregimeapiusers.controllers.v1

import com.github.alexsol.geekregimeapiusers.entities.User
import com.github.alexsol.geekregimeapiusers.services.v1.UserService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping(
    path  = ["\${api-users.prefix}/\${api-users.resource}/v1"],
    produces = ["application/json"]
)
class UserController(val service: UserService) {
    @GetMapping
    fun index(): List<User> = service.findUsers()

    @PostMapping
    fun post(@RequestBody user: User) {
        service.createUser(user)
    }
}

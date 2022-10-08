package com.github.alexeysol.geekregimeapiusers.services.v1.userservice

import com.github.alexeysol.geekregimeapicommons.utils.converters.PageableConverter
import com.github.alexeysol.geekregimeapiusers.repositories.CredentialsRepository
import com.github.alexeysol.geekregimeapiusers.repositories.UserRepository
import com.github.alexeysol.geekregimeapiusers.services.v1.CredentialsService
import com.github.alexeysol.geekregimeapiusers.services.v1.UserService
import io.mockk.mockk
import org.springframework.data.domain.Pageable

abstract class BaseUserServiceTest {
    private val credentialsRepository: CredentialsRepository = mockk()
    protected val userRepository: UserRepository = mockk()

    private val credentialsService = CredentialsService(credentialsRepository)
    protected val userService = UserService(userRepository, credentialsService)

    private val pageableConverterStub = PageableConverter("", "")
    protected val pageableStub: Pageable = pageableConverterStub.pageable
}

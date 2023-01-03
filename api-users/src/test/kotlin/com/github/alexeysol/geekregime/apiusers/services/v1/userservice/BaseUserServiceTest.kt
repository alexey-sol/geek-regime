package com.github.alexeysol.geekregime.apiusers.services.v1.userservice

import com.github.alexeysol.geekregime.apicommons.utils.converters.PageableConverter
import com.github.alexeysol.geekregime.apiusers.models.entities.Details
import com.github.alexeysol.geekregime.apiusers.repositories.CredentialsRepository
import com.github.alexeysol.geekregime.apiusers.repositories.UserRepository
import com.github.alexeysol.geekregime.apiusers.services.v1.CredentialsService
import com.github.alexeysol.geekregime.apiusers.services.v1.UserService
import io.mockk.mockk
import org.springframework.data.domain.Pageable

abstract class BaseUserServiceTest {
    private val credentialsRepository: CredentialsRepository = mockk()
    protected val repository: UserRepository = mockk()

    private val credentialsService = CredentialsService(credentialsRepository)
    protected val service = UserService(repository, credentialsService)

    private val pageableConverterStub = PageableConverter("", "")
    protected val pageableStub: Pageable = pageableConverterStub.pageable

    protected val defaultDetails = Details(name = "For we are many")
}

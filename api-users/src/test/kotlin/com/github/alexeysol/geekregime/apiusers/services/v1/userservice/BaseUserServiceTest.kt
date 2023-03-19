package com.github.alexeysol.geekregime.apiusers.services.v1.userservice

import com.github.alexeysol.geekregime.apicommons.utils.converters.PageableConverter
import com.github.alexeysol.geekregime.apiusers.models.entities.Details
import com.github.alexeysol.geekregime.apiusers.repositories.UserRepository
import com.github.alexeysol.geekregime.apiusers.services.v1.UserService
import io.mockk.mockk
import org.springframework.data.domain.Pageable

abstract class BaseUserServiceTest {
    protected val repository: UserRepository = mockk()
    protected val service = UserService(repository)

    private val pageableConverterStub = PageableConverter("", "")
    protected val pageableStub: Pageable = pageableConverterStub.pageable

    protected val defaultDetails = Details(name = "For we are many")
}

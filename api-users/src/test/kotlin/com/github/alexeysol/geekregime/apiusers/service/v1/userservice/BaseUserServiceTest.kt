package com.github.alexeysol.geekregime.apiusers.service.v1.userservice

import com.github.alexeysol.geekregime.apicommons.util.converter.PageableConverter
import com.github.alexeysol.geekregime.apiusers.model.entity.Details
import com.github.alexeysol.geekregime.apiusers.repository.UserRepository
import com.github.alexeysol.geekregime.apiusers.service.v1.UserService
import io.mockk.mockk
import org.springframework.data.domain.Pageable

abstract class BaseUserServiceTest {
    protected val repository: UserRepository = mockk()
    protected val service = UserService(repository)

    private val pageableConverterStub = PageableConverter("", "")
    protected val pageableStub: Pageable = pageableConverterStub.value

    protected val defaultDetails = Details(name = "For we are many")
}

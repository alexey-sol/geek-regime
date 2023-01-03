package com.github.alexeysol.geekregime.apiusers.configurations

import com.github.alexeysol.geekregime.apicommons.configurations.ApiExceptionHandler
import com.github.alexeysol.geekregime.apiusers.utils.sources.ApiUsersSource
import org.springframework.web.bind.annotation.ControllerAdvice

@ControllerAdvice
class UsersExceptionHandler(source: ApiUsersSource) :
    ApiExceptionHandler(source.resource, source.isProduction())

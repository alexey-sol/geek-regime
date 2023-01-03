package com.github.alexeysol.geekregimeapiusers.configurations

import com.github.alexeysol.geekregimeapicommons.configurations.ApiExceptionHandler
import com.github.alexeysol.geekregimeapiusers.utils.sources.ApiUsersSource
import org.springframework.web.bind.annotation.ControllerAdvice

@ControllerAdvice
class UsersExceptionHandler(source: ApiUsersSource) :
    ApiExceptionHandler(source.resource, source.isProduction())

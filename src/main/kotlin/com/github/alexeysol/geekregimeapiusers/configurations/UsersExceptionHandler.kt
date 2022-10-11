package com.github.alexeysol.geekregimeapiusers.configurations

import com.github.alexeysol.geekregimeapicommons.configurations.ResourceExceptionHandler
import com.github.alexeysol.geekregimeapiusers.utils.sources.ApiUsersSource
import org.springframework.web.bind.annotation.ControllerAdvice

@ControllerAdvice
class UsersExceptionHandler(source: ApiUsersSource) :
    ResourceExceptionHandler(source.resource, source.isProduction())

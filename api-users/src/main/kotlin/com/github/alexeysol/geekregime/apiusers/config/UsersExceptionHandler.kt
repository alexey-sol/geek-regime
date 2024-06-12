package com.github.alexeysol.geekregime.apiusers.config

import com.github.alexeysol.geekregime.apicommons.config.ApiExceptionHandler
import com.github.alexeysol.geekregime.apicommons.constant.ResourceConstant.USERS
import com.github.alexeysol.geekregime.apiusers.util.source.ApiUsersSource
import org.springframework.web.bind.annotation.ControllerAdvice

@ControllerAdvice
class UsersExceptionHandler(source: ApiUsersSource) :
    ApiExceptionHandler(USERS, source.isProduction())

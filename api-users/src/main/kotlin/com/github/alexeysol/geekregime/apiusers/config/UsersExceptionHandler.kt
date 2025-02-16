package com.github.alexeysol.geekregime.apiusers.config

import com.github.alexeysol.geekregime.apicommons.config.ApiErrorHandler
import com.github.alexeysol.geekregime.apicommons.constant.ResourceConstant.USERS
import com.github.alexeysol.geekregime.apiusers.util.source.ApiUsersSource
import org.springframework.web.bind.annotation.ControllerAdvice

@ControllerAdvice
class UsersExceptionHandler(source: ApiUsersSource) : ApiErrorHandler(USERS, source.isProduction())

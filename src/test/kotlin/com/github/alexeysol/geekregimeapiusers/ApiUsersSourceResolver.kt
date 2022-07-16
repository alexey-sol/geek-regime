package com.github.alexeysol.geekregimeapiusers

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

@Component
data class ApiUsersSourceResolver (
    @Value("\${api-users.prefix}")
    val apiPrefix: String? = null,

    @Value("\${api-users.resource}")
    val resource: String? = null,
) {
    fun getApiPath(version: Int = 1) = "/${apiPrefix}/v${version}/${resource}"
}

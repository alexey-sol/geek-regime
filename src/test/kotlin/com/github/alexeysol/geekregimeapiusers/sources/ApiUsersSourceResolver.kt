package com.github.alexeysol.geekregimeapiusers.sources

import com.github.alexeysol.geekregimeapicommons.models.ApiPath
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

@Component
data class ApiUsersSourceResolver (
    @Value("\${api-users.prefix}")
    private val apiPrefix: String? = null,

    @Value("\${api-users.resource}")
    private val resource: String? = null,
) : ApiPath {
    override fun getApiPath(version: Int) = "/${apiPrefix}/v${version}/${resource}"
}

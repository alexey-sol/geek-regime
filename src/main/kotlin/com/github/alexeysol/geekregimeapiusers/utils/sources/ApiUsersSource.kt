package com.github.alexeysol.geekregimeapiusers.utils.sources

import com.github.alexeysol.geekregimeapicommons.models.ApiPath
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

@Component
data class ApiUsersSource (
    private val PRODUCTION_PROFILE: String? = "prod",

    @Value("\${spring.profiles.active}")
    private val activeProfile: String? = null,

    @Value("\${api-users.prefix}")
    private val apiPrefix: String? = null,

    @Value("\${api-users.resource}")
    val resource: String? = null,
) : ApiPath {
    fun isProduction(): Boolean = PRODUCTION_PROFILE == activeProfile

    override fun getApiPath(version: Int): String = formatApiPath(apiPrefix, version, resource)
}

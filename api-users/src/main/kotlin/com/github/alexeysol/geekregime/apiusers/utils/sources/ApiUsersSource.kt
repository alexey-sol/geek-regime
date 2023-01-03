package com.github.alexeysol.geekregime.apiusers.utils.sources

import com.github.alexeysol.geekregime.apicommons.models.sources.ActiveProfile
import com.github.alexeysol.geekregime.apicommons.models.sources.ApiPath
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

@Component
data class ApiUsersSource (
    @Value("\${spring.profiles.active}")
    private val activeProfile: String,

    @Value("\${api-users.prefix}")
    private val apiPrefix: String,

    @Value("\${api-users.resource}")
    val resource: String? = null,
) : ApiPath, ActiveProfile {
    override fun getApiPath(version: Int): String = formatApiPath(apiPrefix, version, resource)

    override fun getActiveProfile(): String = activeProfile
}

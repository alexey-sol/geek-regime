package com.github.alexeysol.geekregime.apiusers.util.source

import com.github.alexeysol.geekregime.apicommons.model.source.ActiveProfile
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

@Component
data class ApiUsersSource (
    @Value("\${spring.profiles.active}")
    private val activeProfile: String,
) : ActiveProfile {
    override fun getActiveProfile(): String = activeProfile
}

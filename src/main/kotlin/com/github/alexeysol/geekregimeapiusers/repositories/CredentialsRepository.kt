package com.github.alexeysol.geekregimeapiusers.repositories

import com.github.alexeysol.geekregimeapiusers.models.entities.Credentials
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface CredentialsRepository : CrudRepository<Credentials, Long> {
    fun findCredentialsByUserId(userId: Long): Credentials?
}

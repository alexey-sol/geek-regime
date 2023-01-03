package com.github.alexeysol.geekregime.apiusers.repositories

import com.github.alexeysol.geekregime.apiusers.models.entities.Credentials
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface CredentialsRepository : CrudRepository<Credentials, Long> {
    fun findCredentialsByUserId(userId: Long): Credentials?
}

package com.github.alexeysol.geekregime.apiusers.repository

import com.github.alexeysol.geekregime.apiusers.model.entity.Credentials
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface CredentialsRepository : CrudRepository<Credentials, Long> {
    fun findCredentialsByUserId(userId: Long): Credentials?
}

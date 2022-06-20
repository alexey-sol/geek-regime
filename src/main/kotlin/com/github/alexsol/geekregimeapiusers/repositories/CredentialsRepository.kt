package com.github.alexsol.geekregimeapiusers.repositories

import com.github.alexsol.geekregimeapiusers.entities.Credentials
import org.springframework.data.repository.CrudRepository

interface CredentialsRepository : CrudRepository<Credentials, Int>

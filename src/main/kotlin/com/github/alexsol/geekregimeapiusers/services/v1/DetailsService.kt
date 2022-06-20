package com.github.alexsol.geekregimeapiusers.services.v1

import com.github.alexsol.geekregimeapiusers.entities.Details
import com.github.alexsol.geekregimeapiusers.repositories.DetailsRepository
import org.springframework.stereotype.Service

@Service
class DetailsService(val db: DetailsRepository) {
    fun createDetails(details: Details): Details = db.save(details)
}

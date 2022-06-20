package com.github.alexsol.geekregimeapiusers.repositories

import com.github.alexsol.geekregimeapiusers.entities.Details
import org.springframework.data.repository.CrudRepository

interface DetailsRepository : CrudRepository<Details, Int>

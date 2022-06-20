package com.github.alexsol.geekregimeapiusers.constants

object DatabaseConstants {
    const val CREDENTIALS_TABLE = "credentials"
    const val USER_TABLE = "\"user\"" // [1]
    const val DETAILS_TABLE = "details"
}

// [1]. "user" is a reserved keyword in Postgres

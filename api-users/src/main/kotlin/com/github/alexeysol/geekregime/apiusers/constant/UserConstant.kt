package com.github.alexeysol.geekregime.apiusers.constant

object UserConstant {
    const val EMAIL_FIELD = "email"
    const val ID_FIELD = "id"
    const val OLD_PASSWORD_FIELD = "oldPassword"
    const val PASSWORD_FIELD = "password"
    const val SLUG_FIELD = "slug"
    val SEARCHABLE_FIELDS = listOf("details.name", "slug")
    val SORTABLE_FIELDS = listOf("createdAt", "details.name", "email", "id")
}

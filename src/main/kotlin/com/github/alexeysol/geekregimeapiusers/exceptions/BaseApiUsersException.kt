package com.github.alexeysol.geekregimeapiusers.exceptions

abstract class BaseApiUsersException(
    message: String? = null,
    private val invalidKeyValuePair: Pair<String, String>? = null
) : RuntimeException(message) {
    override val message: String
    get() = "${super.message}${getExtraInfoIfAvailable()}"

    private fun getExtraInfoIfAvailable(): String {
        val (key, value) = invalidKeyValuePair?.run {
            invalidKeyValuePair.first to invalidKeyValuePair.second
        } ?: ("" to "")

        return if (invalidKeyValuePair == null) "" else ", provided $key = $value"
    }
}

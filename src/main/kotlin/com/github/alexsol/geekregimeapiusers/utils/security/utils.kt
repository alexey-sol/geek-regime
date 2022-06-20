package com.github.alexsol.geekregimeapiusers.utils.security

import java.security.SecureRandom
import java.security.spec.KeySpec
import javax.crypto.SecretKeyFactory
import javax.crypto.spec.PBEKeySpec

private object Constants {
    const val ALGORITHM = "PBKDF2WithHmacSHA1"
    const val ITERATION_COUNT = 65536
    const val KEY_LENGTH = 512
}

private val random: SecureRandom = SecureRandom()

fun generateSalt(size: Int = 16): ByteArray {
    val random = SecureRandom()
    val salt = ByteArray(size)
    random.nextBytes(salt)
    return salt
}

fun generateHash(password: String, salt: ByteArray): ByteArray {
    val spec: KeySpec = PBEKeySpec(
        password.toCharArray(),
        salt,
        Constants.ITERATION_COUNT,
        Constants.KEY_LENGTH
    )

    val factory = SecretKeyFactory.getInstance(Constants.ALGORITHM)
    return factory.generateSecret(spec).encoded
}

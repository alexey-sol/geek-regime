package com.github.alexsol.geekregimeapiusers.utils

import com.github.alexsol.geekregimeapiusers.sameContentInArrays
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test

class SecurityTest {
    @Test
    fun givenSameArraySize_whenGenerateSalt_thenReturnsDifferentSalt() {
        val size = 16
        val salt1 = Security.generateSalt(size)
        val salt2 = Security.generateSalt(size)
        val salt3 = Security.generateSalt(size)

        Assertions.assertFalse(salt1.equals(salt2))
        Assertions.assertFalse(salt1.equals(salt3))
        Assertions.assertFalse(salt2.equals(salt3))
    }

    @Test
    fun givenArraySize_whenGenerateSalt_thenReturnsSaltWithThatSize() {
        val size1 = 8
        val size2 = 16
        val salt1 = Security.generateSalt(size1)
        val salt2 = Security.generateSalt(size2)

        Assertions.assertEquals(size1, salt1.size)
        Assertions.assertEquals(size2, salt2.size)
    }

    @Test
    fun givenSameStringAndSalt_whenGenerateHash_thenReturnsSameHash() {
        val string1 = "123"
        val string2 = "123"
        val salt = Security.generateSalt(16)
        val hashedString1 = Security.generateHash(string1, salt).toTypedArray()
        val hashedString2 = Security.generateHash(string2, salt).toTypedArray()

        Assertions.assertTrue(sameContentInArrays(hashedString1, hashedString2))
    }

    @Test
    fun givenDifferentStringsAndSameSalt_whenGenerateHash_thenReturnsDifferentHash() {
        val string1 = "123"
        val string2 = "124"
        val salt = Security.generateSalt(16)
        val hashedString1 = Security.generateHash(string1, salt).toTypedArray()
        val hashedString2 = Security.generateHash(string2, salt).toTypedArray()

        Assertions.assertFalse(sameContentInArrays(hashedString1, hashedString2))
    }

    @Test
    fun givenSameStringAndDifferentSalt_whenGenerateHash_thenReturnsDifferentHash() {
        val string1 = "123"
        val string2 = "123"
        val salt1 = Security.generateSalt(16)
        val salt2 = Security.generateSalt(17)
        val hashedString1 = Security.generateHash(string1, salt1).toTypedArray()
        val hashedString2 = Security.generateHash(string2, salt2).toTypedArray()

        Assertions.assertFalse(sameContentInArrays(hashedString1, hashedString2))
    }
}

package com.github.alexeysol.geekregimeapiusers.utils

import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test

class SecurityTest {
    @Test
    fun givenSameArraySize_whenGenerateSalt_thenReturnsDifferentSalt() {
        val size = 16
        val salt1 = Security.generateSalt(size)
        val salt2 = Security.generateSalt(size)
        val salt3 = Security.generateSalt(size)

        Assertions.assertFalse(salt1 === salt2)
        Assertions.assertFalse(salt1 === salt3)
        Assertions.assertFalse(salt2 === salt3)
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

        Assertions.assertTrue(isSameContentsInArrays(hashedString1, hashedString2))
    }

    @Test
    fun givenDifferentStringsAndSameSalt_whenGenerateHash_thenReturnsDifferentHash() {
        val string1 = "123"
        val string2 = "124"
        val salt = Security.generateSalt(16)
        val hashedString1 = Security.generateHash(string1, salt).toTypedArray()
        val hashedString2 = Security.generateHash(string2, salt).toTypedArray()

        Assertions.assertFalse(isSameContentsInArrays(hashedString1, hashedString2))
    }

    @Test
    fun givenSameStringAndDifferentSalt_whenGenerateHash_thenReturnsDifferentHash() {
        val string1 = "123"
        val string2 = "123"
        val salt1 = Security.generateSalt(16)
        val salt2 = Security.generateSalt(17)
        val hashedString1 = Security.generateHash(string1, salt1).toTypedArray()
        val hashedString2 = Security.generateHash(string2, salt2).toTypedArray()

        Assertions.assertFalse(isSameContentsInArrays(hashedString1, hashedString2))
    }

    private fun <Item>isSameContentsInArrays(array1: Array<Item>, array2: Array<Item>): Boolean {
        if (array1.size != array2.size) {
            return false
        }

        array1.forEachIndexed { index, item ->
            if (item != array2[index]) {
                return false
            }
        }

        return true
    }
}

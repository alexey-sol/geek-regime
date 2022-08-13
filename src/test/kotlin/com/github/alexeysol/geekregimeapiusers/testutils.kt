package com.github.alexeysol.geekregimeapiusers

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders

val objectMapper = ObjectMapper()

fun <Value>objectToJsonString(obj: Value? = null): String {
    try {
        return objectMapper.writeValueAsString(obj);
    } catch (exception: Exception) {
        throw RuntimeException(exception);
    }
}

fun <Value>mockPostRequest(apiPath: String, value: Value? = null): MockHttpServletRequestBuilder {
    return MockMvcRequestBuilders.post(apiPath)
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectToJsonString(value))
}

fun <Item>isSameContentsInArrays(array1: Array<Item>, array2: Array<Item>): Boolean {
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

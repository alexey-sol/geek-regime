package com.github.alexsol.geekregimeapiusers

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders

fun objectToJsonString(obj: Any? = null): String {
    try {
        return ObjectMapper().writeValueAsString(obj);
    } catch (exception: Exception) {
        throw RuntimeException(exception);
    }
}

fun mockPostRequest(apiPath: String, data: Any? = null): MockHttpServletRequestBuilder {
    return MockMvcRequestBuilders.post(apiPath)
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectToJsonString(data))
}

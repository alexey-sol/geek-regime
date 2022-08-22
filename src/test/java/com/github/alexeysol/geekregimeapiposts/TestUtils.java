package com.github.alexeysol.geekregimeapiposts;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

public class TestUtils {
    static private final ObjectMapper objectMapper = new ObjectMapper();

    static public <Value> String objectToJsonString(Value obj) {
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (Exception exception) {
            throw new RuntimeException(exception);
        }
    }

    static public <Value> MockHttpServletRequestBuilder mockPostRequest(
        String apiPath,
        Value value
    ) {
        return MockMvcRequestBuilders.post(apiPath)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectToJsonString(value));
    }

    static public <Value> MockHttpServletRequestBuilder mockPatchRequest(
        String apiPath,
        Value value
    ) {
        return MockMvcRequestBuilders.patch(apiPath)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectToJsonString(value));
    }
}

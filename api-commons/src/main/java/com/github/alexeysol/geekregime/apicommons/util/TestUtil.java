package com.github.alexeysol.geekregime.apicommons.util;

import com.github.alexeysol.geekregime.apicommons.util.parser.Json;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

public class TestUtil {
    public static <T> MockHttpServletRequestBuilder mockPostRequest(String apiPath, T value) {
        return MockMvcRequestBuilders.post(apiPath)
            .contentType(MediaType.APPLICATION_JSON)
            .content(Json.stringify(value));
    }

    public static <T> MockHttpServletRequestBuilder mockPatchRequest(String apiPath, T value) {
        return MockMvcRequestBuilders.patch(apiPath)
            .contentType(MediaType.APPLICATION_JSON)
            .content(Json.stringify(value));
    }
}

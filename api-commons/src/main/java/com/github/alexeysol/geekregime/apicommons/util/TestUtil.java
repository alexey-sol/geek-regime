package com.github.alexeysol.geekregime.apicommons.util;

import com.github.alexeysol.geekregime.apicommons.util.parser.Json;
import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Assertions;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.io.UnsupportedEncodingException;

public class TestUtil {
    public static <Value> MockHttpServletRequestBuilder mockPostRequest(
        String apiPath,
        Value value
    ) {
        return MockMvcRequestBuilders.post(apiPath)
            .contentType(MediaType.APPLICATION_JSON)
            .content(Json.stringify(value));
    }

    public static <Value> MockHttpServletRequestBuilder mockPatchRequest(
        String apiPath,
        Value value
    ) {
        return MockMvcRequestBuilders.patch(apiPath)
            .contentType(MediaType.APPLICATION_JSON)
            .content(Json.stringify(value));
    }

    public static <ValueType> void responseContentEqualsProvidedPage(
        Page<ValueType> page,
        String contentAsString
    ) throws UnsupportedEncodingException {
        int expectedPageContentSize = page.getContent().size();
        int actualPageContentSize = JsonPath.read(contentAsString, "$.content.length()");

        Assertions.assertEquals(Json.stringify(page), contentAsString);
        Assertions.assertEquals(expectedPageContentSize, actualPageContentSize);
    }
}

package com.github.alexeysol.geekregimeapicommons.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.github.alexeysol.geekregimeapicommons.exceptions.BaseApiPostsException;
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.util.Assert;

import java.util.Map;

public class Json {
    private static final ObjectMapper mapper = new ObjectMapper();

    private static final String ERROR_FIELD = "error";
    private static final String MESSAGE_FIELD = "message";
    private static final String STATUS_FIELD = "status";

    public static <Content> Content parse(
        String json,
        Class<Content> valueType
    ) throws JsonProcessingException, BaseApiPostsException {
        assertJsonIsNotApiError(json);
        return mapper.readValue(json, valueType);
    }

    public static <Content> Content parse(
        String json,
        TypeReference<Content> valueTypeRef
    ) throws JsonProcessingException {
        return mapper.readValue(json, valueTypeRef);
    }

    public static Map<String, Object> parse(String json) throws JsonProcessingException {
        ObjectReader reader = mapper.readerFor(Map.class);
        return reader.readValue(json);
    }

    private static void assertJsonIsNotApiError(String json) throws JsonProcessingException,
    BaseApiPostsException {
        Map<String, Object> map = parse(json);
        String message = getMessageIfExists(map);

        try {
            Assert.isTrue(!isNotFoundError(map), message);
        } catch (IllegalArgumentException e) {
            throw new ResourceNotFoundException(message);
        }
    }

    private static String getMessageIfExists(Map<String, Object> map) {
        return map.containsKey(MESSAGE_FIELD)
            ? map.get(MESSAGE_FIELD).toString()
            : "";
    }

    private static boolean isNotFoundError(Map<String, Object> map) {
        int notFoundValue = HttpStatus.NOT_FOUND.value();
        return isApiError(map) && map.get(STATUS_FIELD).equals(notFoundValue);
    }

    private static boolean isApiError(Map<String, Object> map) {
        return (
            map.containsKey(ERROR_FIELD) &&
            map.containsKey(MESSAGE_FIELD) &&
            map.containsKey(STATUS_FIELD)
        );
    }
}

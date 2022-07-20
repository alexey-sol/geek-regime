package com.github.alexeysol.geekregimeapicommons.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.github.alexeysol.geekregimeapicommons.exceptions.BaseResourceException;
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceAlreadyExistsException;
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceNotFoundException;
import org.springframework.util.Assert;

import java.util.Map;

public class Json {
    private static final ObjectMapper mapper = new ObjectMapper();

    public static <Content> Content parse(
        String json,
        Class<Content> valueType
    ) throws JsonProcessingException, BaseResourceException {
        assertJsonIsNotApiException(json);
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

    private static void assertJsonIsNotApiException(String json) throws JsonProcessingException,
    BaseResourceException {
        Map<String, Object> map = parse(json);
        ExceptionCheck check = new ExceptionCheck(map);
        String message = check.getMessageIfExists();

        try {
            Assert.isTrue(!check.isApiException(), message);
        } catch (IllegalArgumentException e) {
            if (check.isNotFoundException()) {
                throw new ResourceNotFoundException(message);
            } else if (check.isAlreadyExistsException()) {
                throw new ResourceAlreadyExistsException(message);
            } else {
                throw new RuntimeException(message);
            }
        }
    }
}

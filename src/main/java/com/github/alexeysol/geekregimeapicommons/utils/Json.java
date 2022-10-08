package com.github.alexeysol.geekregimeapicommons.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.github.alexeysol.geekregimeapicommons.exceptions.BadRequestException;
import com.github.alexeysol.geekregimeapicommons.exceptions.BaseResourceException;
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceAlreadyExistsException;
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceNotFoundException;
import org.springframework.util.Assert;

import java.util.Map;

public class Json {
    private static final ObjectMapper objectMapper = new ObjectMapper()
        .findAndRegisterModules()
        .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
        .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    public ObjectMapper getObjectMapper() {
        return objectMapper;
    }

    public static <Content> Content parse(
        String json,
        Class<Content> valueType
    ) throws JsonProcessingException, BaseResourceException {
        assertJsonIsNotApiException(json);
        return objectMapper.readValue(json, valueType);
    }

    public static <Content> Content parse(
        String json,
        TypeReference<Content> valueTypeRef
    ) throws JsonProcessingException {
        assertJsonIsNotApiException(json);
        return objectMapper.readValue(json, valueTypeRef);
    }

    public static Map<String, Object> parse(String json) throws JsonProcessingException {
        assertJsonIsNotApiException(json);
        return readMap(json);
    }

    static public <Value> String stringify(Value obj) {
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (Exception exception) {
            throw new RuntimeException(exception);
        }
    }

    private static void assertJsonIsNotApiException(String json) throws JsonProcessingException,
        BaseResourceException {

        Map<String, Object> map = readMap(json);
        ExceptionCheck check = new ExceptionCheck(map);
        String message = check.getMessageIfExists();

        try {
            Assert.isTrue(!check.isApiException(), message);
        } catch (IllegalArgumentException exception) {
            if (check.isNotFoundException()) {
                throw new ResourceNotFoundException(message);
            } else if (check.isAlreadyExistsException()) {
                throw new ResourceAlreadyExistsException(message);
            } else {
                throw new BadRequestException(message);
            }
        }
    }

    private static Map<String, Object> readMap(
        String json
    ) throws JsonProcessingException {
        ObjectReader reader = objectMapper.readerFor(Map.class);
        return reader.readValue(json);
    }
}

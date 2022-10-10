package com.github.alexeysol.geekregimeapicommons.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.http.HttpStatus;
import org.springframework.util.Assert;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

public class Json {
    private static final ObjectMapper objectMapper = new ObjectMapper()
        .findAndRegisterModules()
        .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
        .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    public ObjectMapper getObjectMapper() {
        return objectMapper;
    }

    public static <Content> Content parse(String json, Class<Content> valueType) {
        try {
            assertJsonIsNotApiException(json);
            return objectMapper.readValue(json, valueType);
        } catch (JsonProcessingException exception) {
            throw new RuntimeException(exception);
        }
    }

    public static <Content> Content parse(String json, TypeReference<Content> valueTypeRef) {
        try {
            assertJsonIsNotApiException(json);
            return objectMapper.readValue(json, valueTypeRef);
        } catch (JsonProcessingException exception) {
            throw new RuntimeException(exception);
        }
    }

    public static Map<String, Object> parse(String json) {
        try {
            assertJsonIsNotApiException(json);
            return readMap(json);
        } catch (JsonProcessingException exception) {
            throw new RuntimeException(exception);
        }
    }

    static public <Value> String stringify(Value obj) {
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (Exception exception) {
            throw new RuntimeException(exception);
        }
    }

    private static void assertJsonIsNotApiException(String json) throws JsonProcessingException {
        Map<String, Object> map = readMap(json);
        ExceptionMapReader reader = new ExceptionMapReader(map);
        String message = reader.getMessage().orElse("");

        try {
            Assert.isTrue(!reader.isApiException(), message);
        } catch (IllegalArgumentException exception) {
            HttpStatus status = reader.getStatus().orElse(HttpStatus.INTERNAL_SERVER_ERROR);
            throw new ResponseStatusException(status, message);
        }
    }

    private static Map<String, Object> readMap(String json) throws JsonProcessingException {
        ObjectReader reader = objectMapper.readerFor(Map.class);
        return reader.readValue(json);
    }
}

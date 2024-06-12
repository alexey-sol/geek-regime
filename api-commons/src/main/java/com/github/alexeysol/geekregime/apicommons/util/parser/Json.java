package com.github.alexeysol.geekregime.apicommons.util.parser;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

import java.util.Map;

public class Json {
    private static final ObjectMapper mapper = new ObjectMapper()
        .findAndRegisterModules()
        .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
        .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    public static <Content> Content parse(String json, Class<Content> valueType) {
        try {
            return mapper.readValue(json, valueType);
        } catch (JsonProcessingException exception) {
            throw new RuntimeException(exception);
        }
    }

    public static <Content> Content parse(String json, TypeReference<Content> valueTypeRef) {
        try {
            return mapper.readValue(json, valueTypeRef);
        } catch (JsonProcessingException exception) {
            throw new RuntimeException(exception);
        }
    }

    public static Map<String, Object> parse(String json) {
        try {
            ObjectReader reader = mapper.readerFor(Map.class);
            return reader.readValue(json);
        } catch (JsonProcessingException exception) {
            throw new RuntimeException(exception);
        }
    }

    static public <Value> String stringify(Value obj) {
        try {
            return mapper.writeValueAsString(obj);
        } catch (Exception exception) {
            throw new RuntimeException(exception);
        }
    }
}

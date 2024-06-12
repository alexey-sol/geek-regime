package com.github.alexeysol.geekregime.apicommons.util.converter;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

public class MapConverter {
    public static <ValueType> ValueType toClass(
        Map<?, ?> map,
        Class<ValueType> valueType
    ) {
        ObjectMapper objectMapper = new ObjectMapper();
        JavaType type = objectMapper.getTypeFactory().constructType(valueType);
        return objectMapper.convertValue(map, type);
    }
}

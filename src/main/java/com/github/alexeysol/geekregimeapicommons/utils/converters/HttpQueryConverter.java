package com.github.alexeysol.geekregimeapicommons.utils.converters;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class HttpQueryConverter {
    public static String toListAsString(List<?> list) {
        return toListAsString(list, ",");
    }

    private static String toListAsString(List<?> list, String delimiter) {
        List<String> listAsString = list.stream()
            .map(String::valueOf)
            .toList();

        return String.join(delimiter, listAsString);
    }

    public static String toParam(String key, String value) {
        return toParam(key, value, false);
    }

    public static String toParam(String key, String value, boolean isAppending) {
        char leadingDelimiter = (isAppending) ? '&' : '?';
        return String.format("%c%s=%s", leadingDelimiter, key, encode(value));
    }

    private static String encode(String value) {
        try {
            return URLEncoder.encode(value, StandardCharsets.UTF_8.toString());
        } catch (UnsupportedEncodingException exception) {
            return value;
        }
    }
}

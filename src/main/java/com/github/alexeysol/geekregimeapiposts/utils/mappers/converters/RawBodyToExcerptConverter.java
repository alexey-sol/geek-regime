package com.github.alexeysol.geekregimeapiposts.utils.mappers.converters;

import org.modelmapper.AbstractConverter;

public class RawBodyToExcerptConverter extends AbstractConverter<String, String> {
    @Override
    protected String convert(String rawBody) {
        return generateExcerpt(rawBody);
    }

    private String generateExcerpt(String rawBody) {
        // TODO refactor
        int MAX_LENGTH = 19;
        int bodyLength = rawBody.length();

        return (bodyLength <= MAX_LENGTH)
            ? rawBody
            : rawBody.substring(0, MAX_LENGTH) + "…";
    }
}

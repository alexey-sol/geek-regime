package com.github.alexeysol.geekregime.apiposts.mapper.converters;

import com.github.alexeysol.geekregime.apiposts.util.PostDataUtil;
import org.modelmapper.AbstractConverter;

public class BodyToExcerptConverter extends AbstractConverter<String, String> {
    @Override
    protected String convert(String body) {
        return generateExcerpt(body);
    }

    private String generateExcerpt(String body) {
        return PostDataUtil.generateExcerpt(body);
    }
}

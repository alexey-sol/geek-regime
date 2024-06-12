package com.github.alexeysol.geekregime.apiposts.mapper.converters;

import com.github.alexeysol.geekregime.apiposts.util.Html;
import org.modelmapper.AbstractConverter;

import static com.github.alexeysol.geekregime.apiposts.constant.PostConstant.*;

public class BodyToExcerptConverter extends AbstractConverter<String, String> {
    @Override
    protected String convert(String body) {
        return generateExcerpt(body);
    }

    private String generateExcerpt(String body) {
        String text = new Html(body).text();

        return (text.length() <= MAX_EXCERPT_LENGTH)
            ? text
            : getExcerptFromText(text);
    }

    private String getExcerptFromText(String text) {
        return text.substring(0, MAX_EXCERPT_LENGTH).trim() + EXCERPT_ENDING;
    }
}

package com.github.alexeysol.geekregimeapiposts.utils.mappers.converters;

import com.github.alexeysol.geekregimeapicommons.utils.parsers.Html;
import com.github.alexeysol.geekregimeapiposts.constants.PostConstants;
import org.modelmapper.AbstractConverter;

public class BodyToExcerptConverter extends AbstractConverter<String, String> {
    @Override
    protected String convert(String body) {
        return generateExcerpt(body);
    }

    private String generateExcerpt(String body) {
        String text = new Html(body).text();

        return (text.length() <= PostConstants.MAX_EXCERPT_LENGTH)
            ? text
            : getExcerptFromText(text);
    }

    private String getExcerptFromText(String text) {
        return text.substring(0, PostConstants.MAX_EXCERPT_LENGTH).trim() +
            PostConstants.EXCERPT_ENDING;
    }
}

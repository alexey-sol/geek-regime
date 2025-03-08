package com.github.alexeysol.geekregime.apiposts.util;

import lombok.experimental.UtilityClass;

import static com.github.alexeysol.geekregime.apiposts.constant.PostConstant.*;

@UtilityClass
public class PostDataUtil {
    public String generateExcerpt(String body) {
        String text = new Html(body).text();

        return (text.length() <= MAX_EXCERPT_LENGTH)
            ? text
            : getExcerptFromText(text);
    }

    private String getExcerptFromText(String text) {
        return text.substring(0, MAX_EXCERPT_LENGTH).trim() + EXCERPT_ENDING;
    }
}

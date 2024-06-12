package com.github.alexeysol.geekregime.apicommons.util;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class SlugTest {
    @Test
    public void givenTitle_whenGenerateSlug_returnsSlugifiedTitle() {
        String actual = Slug.generateSlug("Hello World");

        String expected = "hello-world";
        Assertions.assertEquals(expected, actual);
    }

    @Test
    public void givenObject_whenGetSuffix_returnsSlugSuffixWithSeparator() {
        int suffixLength = 3;
        int separatorLength = 1;
        int expected = separatorLength + suffixLength;

        int actual = Slug.getSuffix(suffixLength).length();
        Assertions.assertEquals(expected, actual);
    }
}

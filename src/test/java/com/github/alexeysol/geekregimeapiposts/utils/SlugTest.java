package com.github.alexeysol.geekregimeapiposts.utils;

import net.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class SlugTest {
    @Test
    public void givenTitle_whenGenerateSlug_returnsSlugifiedTitle() {
        String title = "Hello World";

        String actual = Slug.generateSlug(title);

        String expected = "hello-world";
        Assertions.assertEquals(expected, actual);
    }

    @Test
    public void givenObject_whenGetSuffixFromHash_returnsSlugSuffix() {
        Object obj = this;

        String actual = Slug.getSuffixFromHash(obj);

        String expected = String.format("-%s", RandomString.hashOf(obj));
        Assertions.assertEquals(expected, actual);
    }
}

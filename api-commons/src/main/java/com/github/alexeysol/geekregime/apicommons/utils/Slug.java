package com.github.alexeysol.geekregime.apicommons.utils;

import com.github.slugify.Slugify;
import net.bytebuddy.utility.RandomString;

public class Slug {
    private static int SUFFIX_LENGTH = 4;

    public static String generateSlug(String title) {
        final Slugify slugify = Slugify.builder()
            .transliterator(true)
            .build();
        String slug = slugify.slugify(title);

        return (slug.isEmpty())
            ? getSuffix()
            : slug;
    }

    public static String getSuffix() {
        return getSuffix(SUFFIX_LENGTH);
    }

    public static String getSuffix(int suffixLength) {
        String suffix = RandomString.make(suffixLength);
        return String.format("-%s", suffix);
    }
}

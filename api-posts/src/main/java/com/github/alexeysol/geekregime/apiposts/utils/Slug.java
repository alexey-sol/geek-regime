package com.github.alexeysol.geekregime.apiposts.utils;

import com.github.alexeysol.geekregime.apiposts.constants.PostConstants;
import com.github.slugify.Slugify;
import net.bytebuddy.utility.RandomString;

public class Slug {
    public static String generateSlug(String title) {
        final Slugify slugify = Slugify.builder()
            .transliterator(true)
            .build();
        String slug = slugify.slugify(title);

        return (slug.isEmpty())
            ? PostConstants.DEFAULT_SLUG
            : slug;
    }

    public static String getSuffix() {
        return getSuffix(4);
    }

    public static String getSuffix(int suffixLength) {
        String suffix = RandomString.make(suffixLength);
        return String.format("-%s", suffix);
    }
}

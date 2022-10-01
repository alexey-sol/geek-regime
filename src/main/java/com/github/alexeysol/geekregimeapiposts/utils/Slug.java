package com.github.alexeysol.geekregimeapiposts.utils;

import com.github.slugify.Slugify;
import net.bytebuddy.utility.RandomString;

public class Slug {
    private final static String DEFAULT_SLUG = "_";

    public static String generateSlug(String title) {
        final Slugify slugify = new Slugify().withTransliterator(true);
        String slug = slugify.slugify(title);

        return (slug.isEmpty())
            ? DEFAULT_SLUG
            : slug;
    }

    // TODO not needed anymore
    public static String getSuffixFromHash(Object obj) {
        return String.format("-%s", RandomString.hashOf(obj));
    }

    public static String getSuffix() {
        return getSuffix(4);
    }

    public static String getSuffix(int suffixLength) {
        String suffix = RandomString.make(suffixLength);
        return String.format("-%s", suffix);
    }
}

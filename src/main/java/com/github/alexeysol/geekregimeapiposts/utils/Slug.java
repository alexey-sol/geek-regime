package com.github.alexeysol.geekregimeapiposts.utils;

import com.github.slugify.Slugify;
import net.bytebuddy.utility.RandomString;

public class Slug {
    public static String generateSlug(String title) {
        final Slugify slugify = new Slugify().withTransliterator(true);
        return slugify.slugify(title);
    }

    public static String getSlugSuffixFromHash(Object obj) {
        return String.format("-%s", RandomString.hashOf(obj));
    }
}

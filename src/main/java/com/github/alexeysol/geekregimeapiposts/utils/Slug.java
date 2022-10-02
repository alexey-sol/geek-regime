package com.github.alexeysol.geekregimeapiposts.utils;

import com.github.alexeysol.geekregimeapiposts.constants.PostConstants;
import com.github.slugify.Slugify;
import net.bytebuddy.utility.RandomString;

public class Slug {
    public static String generateSlug(String title) {
        final Slugify slugify = new Slugify().withTransliterator(true);
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

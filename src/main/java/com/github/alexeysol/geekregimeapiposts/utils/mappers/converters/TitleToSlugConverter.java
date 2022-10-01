package com.github.alexeysol.geekregimeapiposts.utils.mappers.converters;

import com.github.alexeysol.geekregimeapiposts.services.v1.PostService;
import com.github.alexeysol.geekregimeapiposts.utils.Slug;
import org.modelmapper.AbstractConverter;

public class TitleToSlugConverter extends AbstractConverter<String, String> {
    protected final PostService postService;

    public TitleToSlugConverter(PostService postService) {
        this.postService = postService;
    }

    @Override
    protected String convert(String title) {
        return generateSlug(title);
    }

    private String generateSlug(String title) {
        String slug = Slug.generateSlug(title);

        if (postService.postAlreadyExists(slug)) {
            slug += Slug.getSuffix();
        }

        return slug;
    }
}

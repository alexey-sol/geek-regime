package com.github.alexeysol.geekregime.apiposts.utils.mappers.converters;

import com.github.alexeysol.geekregime.apicommons.utils.Slug;
import com.github.alexeysol.geekregime.apiposts.services.v1.PostService;
import org.modelmapper.AbstractConverter;

public class TitleToSlugConverter extends AbstractConverter<String, String> {
    private final PostService service;

    public TitleToSlugConverter(PostService service) {
        this.service = service;
    }

    @Override
    protected String convert(String title) {
        return generateSlug(title);
    }

    private String generateSlug(String title) {
        String slug = Slug.generateSlug(title);

        if (service.postAlreadyExists(slug)) {
            slug += Slug.getSuffix();
        }

        return slug;
    }
}

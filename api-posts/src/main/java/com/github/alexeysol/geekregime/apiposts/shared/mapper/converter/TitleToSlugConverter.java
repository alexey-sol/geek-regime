package com.github.alexeysol.geekregime.apiposts.shared.mapper.converter;

import com.github.alexeysol.geekregime.apicommons.util.Slug;
import com.github.alexeysol.geekregime.apiposts.shared.model.HasExistsBySlug;
import org.modelmapper.AbstractConverter;

public class TitleToSlugConverter extends AbstractConverter<String, String> {
    private final HasExistsBySlug service;

    public TitleToSlugConverter(HasExistsBySlug service) {
        this.service = service;
    }

    @Override
    protected String convert(String title) {
        return generateSlug(title);
    }

    private String generateSlug(String title) {
        String slug = Slug.generateSlug(title);

        if (service.existsBySlug(slug)) {
            slug += Slug.getSuffix();
        }

        return slug;
    }
}

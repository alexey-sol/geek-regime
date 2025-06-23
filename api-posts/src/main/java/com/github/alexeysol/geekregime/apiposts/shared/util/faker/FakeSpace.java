package com.github.alexeysol.geekregime.apiposts.shared.util.faker;

import com.github.alexeysol.geekregime.apicommons.util.Slug;
import com.github.alexeysol.geekregime.apiposts.feature.space.model.entity.Space;
import lombok.experimental.UtilityClass;

@UtilityClass
public class FakeSpace {
    public Space generateSpace() {
        var title = generateTitle();

        return Space.builder()
            .title(title)
            .description(FakerUtil.generateParagraphs(1, 3))
            .slug(Slug.generateSlug(title))
            .isOfficial(FakerUtil.is50PercentChance())
            .build();
    }

    private String generateTitle() {
        return FakerUtil.getFaker().futurama().location();
    }
}

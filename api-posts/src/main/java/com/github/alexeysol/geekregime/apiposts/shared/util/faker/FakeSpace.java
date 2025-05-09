package com.github.alexeysol.geekregime.apiposts.shared.util.faker;

import com.github.alexeysol.geekregime.apicommons.util.Slug;
import com.github.alexeysol.geekregime.apiposts.feature.space.model.entity.Space;
import lombok.experimental.UtilityClass;

@UtilityClass
public class FakeSpace {
    public Space generateSpace(int spaceId) {
        var title = generateTitle();

        return Space.builder()
            .title(title)
            .description(FakerUtil.generateParagraphs(1, 3))
            .slug(generateSlug(title, spaceId))
            .isOfficial(FakerUtil.is50PercentChance())
            .build();
    }

    private String generateTitle() {
        return FakerUtil.getFaker().futurama().location();
    }

    private String generateSlug(String title, int spaceId) {
        return String.format("%s-%d", Slug.generateSlug(title), spaceId);
    }
}

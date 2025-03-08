package com.github.alexeysol.geekregime.apiposts.util.faker;

import com.github.alexeysol.geekregime.apicommons.util.Slug;
import com.github.alexeysol.geekregime.apiposts.constant.FakerConstant;
import com.github.alexeysol.geekregime.apiposts.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.util.PostDataUtil;
import lombok.experimental.UtilityClass;

import java.util.ArrayList;

@UtilityClass
public class FakePost {
    public Post generatePost(int postId, int fakeUserCount) {
        var title = generateTitle();
        var body = FakerUtil.generateBody();

        return Post.builder()
            .userId(FakerUtil.getFaker().number().numberBetween(1, fakeUserCount + 1))
            .title(title)
            .body(body)
            .excerpt(PostDataUtil.generateExcerpt(body))
            .slug(generateSlug(title, postId))
            .build();
    }

    private String generateTitle() {
        var paragraphs = new ArrayList<String>();

        for (int i = 0; i < FakerUtil.getRandomNumber(1, 6); i++) {
            paragraphs.add(FakerUtil.getFaker().futurama().quote());
        }

        return String.join(FakerConstant.WHITESPACE, paragraphs);
    }

    private String generateSlug(String title, int postId) {
        return String.format("%s-%d", Slug.generateSlug(title), postId);
    }
}

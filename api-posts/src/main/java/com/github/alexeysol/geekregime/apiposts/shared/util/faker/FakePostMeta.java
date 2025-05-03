package com.github.alexeysol.geekregime.apiposts.shared.util.faker;

import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.PostMeta;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.PostVote;
import lombok.experimental.UtilityClass;

import java.util.List;

@UtilityClass
public class FakePostMeta {
    private final List<Integer> VIEW_COUNT_BOUNDS = List.of(0, 999, 9_999_999);

    public PostMeta generatePostMeta(Post post) {
        return generatePostMeta(post, List.of(), 0L);
    }

    public PostMeta generatePostMeta(Post post, List<PostVote> votes, long commentCount) {
        long rating = votes.stream()
            .map(PostVote::getValue)
            .reduce(0L, Long::sum);

        var maxViewCount = FakerUtil.getRandomElement(VIEW_COUNT_BOUNDS);
        var viewCount = maxViewCount > 0
            ? FakerUtil.getRandomNumber(0, maxViewCount)
            : maxViewCount;

        return PostMeta.builder()
            .rating(rating)
            .commentCount(commentCount)
            .viewCount(viewCount)
            .post(post)
            .build();
    }
}

package com.github.alexeysol.geekregime.apiposts.util.faker;

import com.github.alexeysol.geekregime.apiposts.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.model.entity.PostMeta;
import com.github.alexeysol.geekregime.apiposts.model.entity.PostVote;
import lombok.experimental.UtilityClass;

import java.util.List;

@UtilityClass
public class FakePostMeta {
    private final int MAX_VIEW_COUNT = 9_999_999;

    public PostMeta generatePostMeta(Post post) {
        return generatePostMeta(post, List.of(), 0L);
    }

    public PostMeta generatePostMeta(Post post, List<PostVote> votes, long commentCount) {
        long rating = votes.stream()
            .map(PostVote::getValue)
            .reduce(0L, Long::sum);

        return PostMeta.builder()
            .rating(rating)
            .commentCount(commentCount)
            .viewCount(FakerUtil.getRandomNumber(0, MAX_VIEW_COUNT))
            .post(post)
            .build();
    }
}

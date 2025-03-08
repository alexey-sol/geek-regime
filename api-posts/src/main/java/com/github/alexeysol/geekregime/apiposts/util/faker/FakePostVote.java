package com.github.alexeysol.geekregime.apiposts.util.faker;

import com.github.alexeysol.geekregime.apiposts.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.model.entity.PostVote;
import lombok.experimental.UtilityClass;

@UtilityClass
public class FakePostVote {
    private final int POSITIVE_VOTE_VALUE = 1;
    private final int NEGATIVE_VOTE_VALUE = -1;

    public PostVote generatePostVote(Post post, int userId) {
        return PostVote.builder()
            .value(FakerUtil.is75PercentChance() ? POSITIVE_VOTE_VALUE : NEGATIVE_VOTE_VALUE)
            .post(post)
            .userId(userId)
            .build();
    }
}

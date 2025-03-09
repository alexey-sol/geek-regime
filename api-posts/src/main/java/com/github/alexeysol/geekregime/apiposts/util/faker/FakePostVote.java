package com.github.alexeysol.geekregime.apiposts.util.faker;

import com.github.alexeysol.geekregime.apiposts.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.model.entity.PostVote;
import lombok.experimental.UtilityClass;

@UtilityClass
public class FakePostVote {
    private final int POSITIVE_VOTE_VALUE = 1;
    private final int NEGATIVE_VOTE_VALUE = -1;

    public PostVote generatePostVote(Post post, int userId) {
        return generatePostVote(post, userId, false);
    }

    public PostVote generatePostVote(Post post, int userId, boolean hasNegativeInclination) {
        var value = hasNegativeInclination
            ? getLikelyNegativeValue()
            : getLikelyPositiveValue();

        return PostVote.builder()
            .value(value)
            .post(post)
            .userId(userId)
            .build();
    }

    private int getLikelyNegativeValue() {
        return FakerUtil.is75PercentChance() ? NEGATIVE_VOTE_VALUE : POSITIVE_VOTE_VALUE;
    }

    private int getLikelyPositiveValue() {
        return FakerUtil.is75PercentChance() ? POSITIVE_VOTE_VALUE : NEGATIVE_VOTE_VALUE;
    }
}

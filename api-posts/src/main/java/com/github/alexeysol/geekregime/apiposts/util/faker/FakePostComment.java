package com.github.alexeysol.geekregime.apiposts.util.faker;

import com.github.alexeysol.geekregime.apiposts.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.model.entity.PostComment;
import lombok.experimental.UtilityClass;

import static com.github.alexeysol.geekregime.apiposts.constant.FakerConstant.*;

@UtilityClass
public class FakePostComment {
    public PostComment generateComment(Post post, int fakeUserCount) {
        return generateComment(post, fakeUserCount, null);
    }

    public PostComment generateComment(Post post, int fakeUserCount, PostComment parent) {
        return PostComment.builder()
            .body(FakerUtil.generateBody())
            .isDeleted(!FakerUtil.is75PercentChance())
            .parent(parent)
            .post(post)
            .userId(FakerUtil.getRandomNumber(INITIAL_ENTITY_ID, fakeUserCount))
            .build();
    }
}

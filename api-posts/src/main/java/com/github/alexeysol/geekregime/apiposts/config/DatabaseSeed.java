package com.github.alexeysol.geekregime.apiposts.config;

import com.github.alexeysol.geekregime.apicommons.util.CollectionUtil;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.PostComment;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.PostVote;
import com.github.alexeysol.geekregime.apiposts.feature.space.model.entity.Space;
import com.github.alexeysol.geekregime.apiposts.shared.util.faker.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.util.Assert;

import javax.persistence.EntityManager;
import javax.sql.DataSource;
import javax.transaction.Transactional;
import java.time.Instant;
import java.util.*;

import static com.github.alexeysol.geekregime.apiposts.shared.constant.FakerConstant.*;
import static java.lang.Math.toIntExact;

@Profile({ "seed-fake-data" })
@Configuration
@RequiredArgsConstructor
public class DatabaseSeed {
    private static final int DEFAULT_ENTITY_COUNT = 0;
    private static final int MAX_ROOT_COMMENT_COUNT = 50;
    private static final int MAX_REPLY_COUNT = 5;
    private static final int MIN_POST_SPACE_COUNT = 1;
    private static final int MAX_POST_SPACE_COUNT = 10;
    private static final String MAX_ENTITY_COUNT_TOO_SMALL_FORMAT = "%s value must be larger than %d";
    private static final String MAX_POST_COUNT_TOO_SMALL = String.format(MAX_ENTITY_COUNT_TOO_SMALL_FORMAT,
        "service.faker.post-count", DEFAULT_ENTITY_COUNT);
    private static final String MAX_SPACE_COUNT_TOO_SMALL = String.format(MAX_ENTITY_COUNT_TOO_SMALL_FORMAT,
        "service.faker.space-count", DEFAULT_ENTITY_COUNT);

    private static final String ENTITY_MANAGER_NOT_INITIALIZED = "Entity manager is not initialized";
    private static final String DATA_SOURCE_NOT_INITIALIZED = "Data source is not initialized";

    @Value("${service.faker.post-count}")
    private int fakePostCount = DEFAULT_ENTITY_COUNT;
    @Value("${service.faker.space-count}")
    private int fakeSpaceCount = DEFAULT_ENTITY_COUNT;
    @Value("${service.faker.user-count}")
    private int fakeUserCount = DEFAULT_ENTITY_COUNT;

    private final EntityManager entityManager;
    private final DataSource dataSource;
    private final List<Space> spaces = new ArrayList<>();
    private final List<Instant> createdAtList = new ArrayList<>();
    private final List<Instant> updatedAtList = new ArrayList<>();
    private final Map<Integer, Long> mapPostIdToCommentCount = new HashMap<>();
    private final Map<Integer, List<Long>> mapPostIdToCommentIds = new HashMap<>();

    @Bean
    @Transactional
    public void seedFakerData() {
        Assert.isTrue(fakePostCount > DEFAULT_ENTITY_COUNT, MAX_POST_COUNT_TOO_SMALL);
        Assert.isTrue(fakeSpaceCount > DEFAULT_ENTITY_COUNT, MAX_SPACE_COUNT_TOO_SMALL);
        Assert.notNull(entityManager, ENTITY_MANAGER_NOT_INITIALIZED);
        Assert.notNull(dataSource, DATA_SOURCE_NOT_INITIALIZED);

        for (int spaceId = INITIAL_ENTITY_ID; spaceId <= fakeSpaceCount; spaceId++) {
            insertSpace(spaceId);
        }

        for (int postId = INITIAL_ENTITY_ID; postId <= fakePostCount; postId++) {
            insertPostWithRelatedData(postId);
        }

        var jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);

        for (int postId = INITIAL_ENTITY_ID; postId <= fakePostCount; postId++) {
            updateDates(jdbcTemplate, postId);
        }
    }

    private void insertSpace(int spaceId) {
        var space = FakeSpace.generateSpace(spaceId);

        entityManager.persist(space);

        spaces.add(space);
    }

    private void insertPostWithRelatedData(int postId) {
        initializePostState(postId);

        var post = insertPost(postId);

        insertComments(post);

        var votes = insertVotes(post);

        insertMeta(post, votes);
    }

    private void initializePostState(int postId) {
        var createdAt = FakerUtil.generateCreatedAt();

        createdAtList.add(createdAt);
        updatedAtList.add(FakerUtil.is50PercentChance() ? createdAt : FakerUtil.generateUpdatedAt(createdAt));

        mapPostIdToCommentIds.put(postId, new ArrayList<>());
        mapPostIdToCommentCount.put(postId, 0L);
    }

    private Post insertPost(int postId) {
        var post = FakePost.generatePost(postId, fakeUserCount);
        var postSpaceCount = FakerUtil.getRandomNumber(MIN_POST_SPACE_COUNT, MAX_POST_SPACE_COUNT);
        post.setSpaces(CollectionUtil.randomSubList(spaces, postSpaceCount));

        entityManager.persist(post);

        return post;
    }

    private void insertComments(Post post) {
        if (FakerUtil.is50PercentChance()) {
            for (int i = 0; i < FakerUtil.getRandomNumber(0, MAX_ROOT_COMMENT_COUNT); i++) {
                var rootComment = insertRootComment(post);

                if (FakerUtil.is50PercentChance()) {
                    for (int j = 0; j < FakerUtil.getRandomNumber(1, MAX_REPLY_COUNT); j++) {
                        insertReplyComment(post, rootComment);
                    }
                }
            }
        }
    }

    private PostComment insertRootComment(Post post) {
        var postIdAsInt = toIntExact(post.getId());
        var rootComment = FakePostComment.generateComment(post, fakeUserCount);

        entityManager.persist(rootComment);

        mapPostIdToCommentIds.getOrDefault(postIdAsInt, new ArrayList<>())
            .add(rootComment.getId());

        if (!rootComment.getIsDeleted()) {
            mapPostIdToCommentCount.merge(postIdAsInt, 1L, Long::sum);
        }

        return rootComment;
    }

    private void insertReplyComment(Post post, PostComment parentComment) {
        var postIdAsInt = toIntExact(post.getId());
        var replyComment = FakePostComment.generateComment(post, fakeUserCount, parentComment);

        entityManager.persist(replyComment);

        mapPostIdToCommentIds.get(postIdAsInt).add(replyComment.getId());

        if (!replyComment.getIsDeleted()) {
            mapPostIdToCommentCount.merge(postIdAsInt, 1L, Long::sum);
        }
    }

    private List<PostVote> insertVotes(Post post) {
        var votes = new ArrayList<PostVote>();
        var hasNegativeInclination = FakerUtil.is50PercentChance();

        if (FakerUtil.is50PercentChance()) {
            for (int userId = INITIAL_ENTITY_ID; userId < FakerUtil.getRandomNumber(0, fakeUserCount); userId++) {
                var vote = FakePostVote.generatePostVote(post, userId, hasNegativeInclination);

                entityManager.persist(vote);

                votes.add(vote);
            }
        }

        return votes;
    }

    private void insertMeta(Post post, List<PostVote> votes) {
        var postIdAsInt = toIntExact(post.getId());

        var postMeta = FakePostMeta.generatePostMeta(post, votes, mapPostIdToCommentCount.getOrDefault(postIdAsInt, 0L));

        entityManager.persist(postMeta);
    }

    private void updateDates(NamedParameterJdbcTemplate jdbcTemplate, int postId) {
        var dateIndex = postId - INITIAL_ENTITY_ID;

        var createdAt = createdAtList.get(dateIndex);
        var updatedAt = updatedAtList.get(dateIndex);
        var commentIds = mapPostIdToCommentIds.get(postId);

        jdbcTemplate.update("""
            UPDATE posts
            SET created_at = :createdAt, updated_at = :updatedAt
            WHERE id = :postId
        """.stripIndent(), new MapSqlParameterSource()
            .addValue("createdAt", Date.from(createdAt))
            .addValue("updatedAt", Date.from(updatedAt))
            .addValue("postId", postId));

        for (Long commentId : commentIds) {
            var commentCreatedAt = FakerUtil.generateUpdatedAt(createdAt);
            var commentUpdatedAt = FakerUtil.generateUpdatedAt(FakerUtil.is50PercentChance() ? commentCreatedAt : FakerUtil.generateUpdatedAt(commentCreatedAt));

            jdbcTemplate.update("""
                UPDATE post_comment
                SET created_at = :createdAt, updated_at = :updatedAt
                WHERE id = :commentId
            """.stripIndent(), new MapSqlParameterSource()
                .addValue("createdAt", Date.from(commentCreatedAt))
                .addValue("updatedAt", Date.from(commentUpdatedAt))
                .addValue("commentId", commentId));
        }
    }
}

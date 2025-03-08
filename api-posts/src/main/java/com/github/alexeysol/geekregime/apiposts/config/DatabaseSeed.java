package com.github.alexeysol.geekregime.apiposts.config;

import com.github.alexeysol.geekregime.apiposts.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.model.entity.PostComment;
import com.github.alexeysol.geekregime.apiposts.model.entity.PostVote;
import com.github.alexeysol.geekregime.apiposts.util.faker.*;
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

import static com.github.alexeysol.geekregime.apiposts.constant.FakerConstant.*;
import static java.lang.Math.toIntExact;

@Profile({ "seed-fake-data" })
@Configuration
@RequiredArgsConstructor
public class DatabaseSeed {
    private static final int DEFAULT_ENTITY_COUNT = 0;
    private static final int MAX_ROOT_COMMENT_COUNT = 50;
    private static final int MAX_REPLY_COUNT = 5;
    private static final String INVALID_FAKE_POST_COUNT = String.format("fake-post-count value must be larger than %d", DEFAULT_ENTITY_COUNT);
    private static final String ENTITY_MANAGER_NOT_INITIALIZED = "Entity manager is not initialized";
    private static final String DATA_SOURCE_NOT_INITIALIZED = "Data source is not initialized";

    @Value("${api-posts.fake-post-count}")
    private int fakePostCount = DEFAULT_ENTITY_COUNT;
    @Value("${api-posts.fake-user-count}")
    private int fakeUserCount = DEFAULT_ENTITY_COUNT;

    private final EntityManager entityManager;
    private final DataSource dataSource;
    private final List<Instant> createdAtList = new ArrayList<>();
    private final List<Instant> updatedAtList = new ArrayList<>();
    private final Map<Integer, Long> mapPostIdToCommentCount = new HashMap<>();
    private final Map<Integer, List<Long>> mapPostIdToCommentIds = new HashMap<>();

    @Bean
    @Transactional
    public void seedFakerData() {
        Assert.isTrue(fakePostCount > DEFAULT_ENTITY_COUNT, INVALID_FAKE_POST_COUNT);
        Assert.notNull(entityManager, ENTITY_MANAGER_NOT_INITIALIZED);
        Assert.notNull(dataSource, DATA_SOURCE_NOT_INITIALIZED);

        for (int postId = INITIAL_ENTITY_ID; postId <= fakePostCount; postId++) {
            insertPostWithRelatedData(postId);
        }

        var jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);

        for (int postId = INITIAL_ENTITY_ID; postId <= fakePostCount; postId++) {
            updateDates(jdbcTemplate, postId);
        }
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

        if (FakerUtil.is50PercentChance()) {
            for (int userId = INITIAL_ENTITY_ID; userId < FakerUtil.getRandomNumber(0, fakeUserCount); userId++) {
                var vote = FakePostVote.generatePostVote(post, userId);

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

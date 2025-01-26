package com.github.alexeysol.geekregime.apiposts.repository;

import com.github.alexeysol.geekregime.apiposts.model.entity.PostComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostCommentRepository extends PagingAndSortingRepository<PostComment, Long> {
    Page<PostComment> findPostCommentsByUserId(long userId, Pageable pageable);

    Page<PostComment> findPostCommentsByPostIdAndParentIsNull(long postId, Pageable pageable);

    long countByPostIdAndIsDeletedIsFalse(long postId);

    @Query( // [1]
        value = "WITH RECURSIVE tree (id, parent_id) AS " +
            "(SELECT id, parent_id " +
            "FROM post_comment " +
            "WHERE parent_id = :parentId " +
            "UNION ALL " +
            "SELECT pc.id, pc.parent_id " +
            "FROM tree INNER JOIN post_comment pc " +
            "ON tree.id = pc.parent_id) " +
            "SELECT COUNT(id) FROM tree",
        nativeQuery = true)
    long countAllDescendantsByParentId(long parentId);

    @Query(
        value = "WITH RECURSIVE tree (id, parent_id) AS " +
            "(SELECT id, parent_id " +
            "FROM post_comment " +
            "WHERE id = :replyId " +
            "UNION ALL " +
            "SELECT pc.id, pc.parent_id " +
            "FROM tree t " +
            "JOIN post_comment pc " +
            "ON pc.id = t.parent_id) " +
            "SELECT id AS root_id " +
            "FROM tree " +
            "WHERE parent_id IS NULL",
        nativeQuery = true
    )
    Optional<Long> findRootPostCommentId(long replyId);
}

// [1]. Borrowed the query ("getAllChildren") from here: https://habr.com/ru/articles/537062/

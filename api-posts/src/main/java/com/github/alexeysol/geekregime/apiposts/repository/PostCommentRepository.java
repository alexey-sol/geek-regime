package com.github.alexeysol.geekregime.apiposts.repository;

import com.github.alexeysol.geekregime.apiposts.model.entity.PostComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface PostCommentRepository extends PagingAndSortingRepository<PostComment, Long> {

    Page<PostComment> findPostCommentsByUserId(long userId, Pageable pageable);

    Page<PostComment> findPostCommentsByPostId(long postId, Pageable pageable);

    @Query("DELETE FROM PostComment pc WHERE pc.id = :id")
    @Transactional
    @Modifying
    int removePostCommentById(long id);

    long countByPostId(long postId);
}

package com.github.alexeysol.geekregime.apiposts.repository;

import com.github.alexeysol.geekregime.apiposts.model.entity.Post;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface PostRepository extends PagingAndSortingRepository<Post, Long>,
    JpaSpecificationExecutor<Post> {

    @Query("SELECT p FROM Post p WHERE p.slug = :slug")
    @Transactional
    Post findPostBySlug(String slug);

    @Query("DELETE FROM Post p WHERE p.id = :id")
    @Transactional
    @Modifying
    int removePostById(long id);

    @Query("UPDATE PostMeta pm SET pm.viewCount = pm.viewCount + 1 WHERE pm.id = :postId")
    @Transactional
    @Modifying
    void incrementViewCount(long postId);

    @Query("UPDATE PostMeta pm SET pm.rating = pm.rating + :value WHERE pm.id = :postId")
    @Transactional
    @Modifying
    int addRating(long postId, long value);

    Boolean existsPostBySlug(String slug);
}

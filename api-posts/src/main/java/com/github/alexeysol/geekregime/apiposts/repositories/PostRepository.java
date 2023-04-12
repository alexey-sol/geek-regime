package com.github.alexeysol.geekregime.apiposts.repositories;

import com.github.alexeysol.geekregime.apiposts.models.entities.Post;
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

    Boolean existsPostBySlug(String slug);
}

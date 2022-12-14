package com.github.alexeysol.geekregimeapiposts.repositories;

import com.github.alexeysol.geekregimeapicommons.utils.search.SearchableRepository;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface PostRepository extends SearchableRepository<Post, Long>,
    PagingAndSortingRepository<Post, Long> {

    @Query("SELECT p FROM Post p WHERE p.slug = :slug")
    @Transactional
    Post findPostBySlug(String slug);

    @Query("DELETE FROM Post p WHERE p.id = :id")
    @Transactional
    @Modifying
    int removePostById(long id);

    Boolean existsPostBySlug(String slug);
}

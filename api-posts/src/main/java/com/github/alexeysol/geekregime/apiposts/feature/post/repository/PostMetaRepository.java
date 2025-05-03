package com.github.alexeysol.geekregime.apiposts.feature.post.repository;

import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.PostMeta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface PostMetaRepository extends JpaRepository<PostMeta, Long> {
    @Query("DELETE FROM PostMeta pm WHERE pm.id = :id")
    @Transactional
    @Modifying
    void removePostMetaById(long id);
}

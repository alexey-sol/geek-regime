package com.github.alexeysol.geekregime.apiposts.feature.post.repository;

import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.PostVote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PostVoteRepository extends JpaRepository<PostVote, Long>, JpaSpecificationExecutor<PostVote> {
    @Query("SELECT pv FROM PostVote pv WHERE pv.userId = :userId AND pv.post.id = :postId")
    PostVote findPostVote(Long userId, Long postId);
}

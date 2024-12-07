package com.github.alexeysol.geekregime.apiposts.service.v1;

import com.github.alexeysol.geekregime.apicommons.constant.Default;
import com.github.alexeysol.geekregime.apiposts.model.entity.PostComment;
import com.github.alexeysol.geekregime.apiposts.repository.PostCommentRepository;
import com.github.alexeysol.geekregime.apiposts.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import java.util.Optional;

@Service
@Validated
@RequiredArgsConstructor
public class PostCommentService {
    private final PostRepository postRepository;
    private final PostCommentRepository postCommentRepository;

    public Page<PostComment> findAllPostCommentsByAuthorId(long authorId, Pageable pageable) {
        return postCommentRepository.findPostCommentsByUserId(authorId, pageable);
    }

    public Page<PostComment> findAllPostCommentsByPostId(long postId, Pageable pageable) {
        return postCommentRepository.findPostCommentsByPostId(postId, pageable);
    }

    public long countAllDescendantsByParentId(long parentId) {
        return postCommentRepository.countAllDescendantsByParentId(parentId);
    }

    public Optional<PostComment> findPostCommentById(long id) {
        return postCommentRepository.findById(id);
    }

    @Transactional
    public PostComment savePostComment(PostComment postComment) {
        return postCommentRepository.save(postComment);
    }

    public void updatePostCommentCount(long postId) {
        postRepository.updatePostCommentCount(postId, postCommentRepository.countByPostId(postId));
    }

    public long removePostCommentById(long id) {
        int deletedRowCount = postCommentRepository.removePostCommentById(id);
        return getMutationResult(id, deletedRowCount);
    }

    // TODO move to shared (is also used in another service)
    private long getMutationResult(long id, int mutatedRowCount) {
        boolean isMutated = mutatedRowCount > 0;

        if (isMutated) {
            return id;
        }

        return Default.NOT_FOUND_BY_ID;
    }
}

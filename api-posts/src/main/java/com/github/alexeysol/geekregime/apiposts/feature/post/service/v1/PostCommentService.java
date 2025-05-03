package com.github.alexeysol.geekregime.apiposts.feature.post.service.v1;

import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.PostComment;
import com.github.alexeysol.geekregime.apiposts.feature.post.repository.PostCommentRepository;
import com.github.alexeysol.geekregime.apiposts.feature.post.repository.PostRepository;
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

    public Page<PostComment> findAllRootPostCommentsByPostId(long postId, Pageable pageable) {
        return postCommentRepository.findPostCommentsByPostIdAndParentIsNull(postId, pageable);
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
        postRepository.updatePostCommentCount(postId, postCommentRepository.countByPostIdAndIsDeletedIsFalse(postId));
    }

    public void softRemovePostComment(PostComment postComment) {
        postComment.setIsDeleted(true);
        postCommentRepository.save(postComment);
    }
}

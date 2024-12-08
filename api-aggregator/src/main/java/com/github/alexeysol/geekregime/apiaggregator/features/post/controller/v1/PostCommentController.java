package com.github.alexeysol.geekregime.apiaggregator.features.post.controller.v1;

import com.github.alexeysol.geekregime.apiaggregator.features.post.mapper.PostCommentMapper;
import com.github.alexeysol.geekregime.apiaggregator.features.post.service.v1.PostCommentService;
import com.github.alexeysol.geekregime.apicommons.exception.SerializedApiException;
import com.github.alexeysol.geekregime.apicommons.generated.model.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.MappingException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static com.github.alexeysol.geekregime.apiaggregator.shared.constant.PathConstant.*;

@RestController
@RequestMapping(path = API_PREFIX_V1, produces = "application/json")
@Validated
@RequiredArgsConstructor
public class PostCommentController {
    private final PostCommentService service;
    private final PostCommentMapper mapper;

    @GetMapping("users/{authorId}/comments")
    PostCommentPageResponse findAllPostCommentsByAuthor(
        @PathVariable long authorId,
        @RequestParam(required = false) Map<String, String> params
    ) {
        var page = service.findAllPostCommentsByAuthor(authorId, params);
        var postPreviews = mapper.toPostCommentResponseList(page.getContent());
        return new PostCommentPageResponse(postPreviews, page.getSize(), page.getTotalElements());
    }

    @GetMapping("posts/{postId}/comments")
    PostCommentPageResponse findAllPostCommentsByPost(
        @PathVariable long postId,
        @RequestParam(required = false) Map<String, String> params
    ) {
        var page = service.findAllPostCommentsByPost(postId, params);
        var postPreviews = mapper.toPostCommentResponseList(page.getContent());
        return new PostCommentPageResponse(postPreviews, page.getSize(), page.getTotalElements());
    }

    @PostMapping("posts/{postId}/comments")
    PostCommentResponse createPostComment(@PathVariable long postId, @RequestBody String request) throws Throwable {
        BasePostCommentResponse postComment = service.createPostComment(postId, request);

        try {
            return mapper.toPostCommentResponse(postComment);
        } catch (MappingException exception) {
            Throwable cause = exception.getCause();
            cleanUpIfNeeded(cause, postComment.getId());
            throw cause;
        }
    }

    @PatchMapping("posts/comments/{id}")
    PostCommentResponse updatePostComment(@PathVariable long id, @RequestBody String request) {
        BasePostCommentResponse updatedPostComment = service.updatePostComment(id, request);
        return mapper.toPostCommentResponse(updatedPostComment);
    }

    @DeleteMapping("posts/comments/{id}")
    IdResponse removePostCommentById(@PathVariable long id) {
        return service.removePostCommentById(id);
    }

    @GetMapping("comments/{id}")
    PostCommentTreeResponse getPostCommentTreeByParentId(@PathVariable long id) {
        BasePostCommentTreeResponse postComment = service.getPostCommentTreeByParentId(id);
        return mapper.toPostCommentTreeResponse(postComment);
    }

    private void cleanUpIfNeeded(Throwable exception, long commentId) {
        // If there are issues with referenced resources (for example, the comment's author doesn't
        // exist), delete the comment.
        if (exception instanceof SerializedApiException) {
            service.removePostCommentById(commentId);
        }
    }
}

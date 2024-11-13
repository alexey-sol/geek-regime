package com.github.alexeysol.geekregime.apiaggregator.features.post.controller.v1;

import com.github.alexeysol.geekregime.apiaggregator.features.post.mapper.PostMapper;
import com.github.alexeysol.geekregime.apiaggregator.features.post.service.v1.PostService;
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
public class PostController {
    private final PostService service;
    private final PostMapper mapper;

    @GetMapping("users/{authorId}/posts")
    PostPreviewPageResponse findAllPostsByAuthor(
        @PathVariable long authorId,
        @RequestParam(required = false) Map<String, String> params
    ) {
        var page = service.findAllPosts(authorId, params);
        var postPreviews = mapper.toPostPreviewResponseList(page.getContent());
        return new PostPreviewPageResponse(postPreviews, page.getSize(), page.getTotalElements());
    }

    @GetMapping("posts")
    PostPreviewPageResponse findAllPosts(
        @RequestParam(required = false) Map<String, String> params
    ) {
        var page = service.findAllPosts(params);
        var postPreviews = mapper.toPostPreviewResponseList(page.getContent());
        return new PostPreviewPageResponse(postPreviews, page.getSize(), page.getTotalElements());
    }

    @GetMapping("posts/{slug}")
    PostDetailsResponse findPostBySlug(@PathVariable String slug) {
        BasePostDetailsResponse postDetailsResponse = service.findPostBySlug(slug);
        return mapper.toPostDetailsResponse(postDetailsResponse);
    }

    @PostMapping("posts")
    PostDetailsResponse createPost(@RequestBody String request) throws Throwable {
        BasePostDetailsResponse postDetailsResponse = service.createPost(request);

        try {
            return mapper.toPostDetailsResponse(postDetailsResponse);
        } catch (MappingException exception) {
            Throwable cause = exception.getCause();
            cleanUpIfNeeded(exception.getCause(), postDetailsResponse.getId());
            throw cause;
        }
    }

    @PatchMapping("posts/{id}")
    PostDetailsResponse updatePost(@PathVariable long id, @RequestBody String request) {
        BasePostDetailsResponse updatedPost = service.updatePost(id, request);
        return mapper.toPostDetailsResponse(updatedPost);
    }

    @DeleteMapping("posts/{id}")
    IdResponse removePostById(@PathVariable long id) {
        return service.removePostById(id);
    }

    @PutMapping("users/{userId}/posts/{postId}/vote")
    public PostDetailsResponse voteOnPost(
        @PathVariable long userId,
        @PathVariable long postId,
        @RequestBody String request
    ) {
        BasePostDetailsResponse updatedPost = service.voteOnPost(userId, postId, request);
        // TODO update the post author's rating as well (request to api-users)
        return mapper.toPostDetailsResponse(updatedPost);
    }

    private void cleanUpIfNeeded(Throwable exception, long postId) {
        // If there are issues with referenced resources (for example, the post's author doesn't
        // exist), delete the post.
        if (exception instanceof SerializedApiException) {
            service.removePostById(postId);
        }
    }
}

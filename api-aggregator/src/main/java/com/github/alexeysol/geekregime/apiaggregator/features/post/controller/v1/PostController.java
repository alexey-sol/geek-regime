package com.github.alexeysol.geekregime.apiaggregator.features.post.controller.v1;

import com.github.alexeysol.geekregime.apiaggregator.features.post.mapper.PostMapper;
import com.github.alexeysol.geekregime.apiaggregator.features.post.service.v1.PostService;
import com.github.alexeysol.geekregime.apicommons.exception.SerializedApiException;
import com.github.alexeysol.geekregime.apicommons.generated.model.IdResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.PostDetailsResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.UserPostDetailsResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.UserPostPreviewPageResponse;
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
    UserPostPreviewPageResponse findAllPostsByAuthor(
        @PathVariable long authorId,
        @RequestParam(required = false) Map<String, String> params
    ) {
        var page = service.findAllPosts(authorId, params);
        var userPostPreviews = mapper.toUserPostDetailsResponseList(page.getContent());
        return new UserPostPreviewPageResponse(userPostPreviews, page.getSize(), page.getTotalElements());
    }

    @GetMapping("posts")
    UserPostPreviewPageResponse findAllPosts(
        @RequestParam(required = false) Map<String, String> params
    ) {
        var page = service.findAllPosts(params);
        var userPostPreviews = mapper.toUserPostDetailsResponseList(page.getContent());
        return new UserPostPreviewPageResponse(userPostPreviews, page.getSize(), page.getTotalElements());
    }

    @GetMapping("posts/{slug}")
    UserPostDetailsResponse findPostBySlug(@PathVariable String slug) {
        PostDetailsResponse postDetailsResponse = service.findPostBySlug(slug);
        return mapper.toUserPostDetailsResponse(postDetailsResponse);
    }

    @PostMapping("posts")
    UserPostDetailsResponse createPost(@RequestBody String request) throws Throwable {
        PostDetailsResponse postDetailsResponse = service.createPost(request);

        try {
            return mapper.toUserPostDetailsResponse(postDetailsResponse);
        } catch (MappingException exception) {
            Throwable cause = exception.getCause();
            cleanUpIfNeeded(exception.getCause(), postDetailsResponse.getId());
            throw cause;
        }
    }

    @PatchMapping("posts/{id}")
    UserPostDetailsResponse updatePost(@PathVariable long id, @RequestBody String request) {
        PostDetailsResponse updatePost = service.updatePost(id, request);
        return mapper.toUserPostDetailsResponse(updatePost);
    }

    @DeleteMapping("posts/{id}")
    IdResponse removePostById(@PathVariable long id) {
        return service.removePostById(id);
    }

    private void cleanUpIfNeeded(Throwable exception, long postId) {
        // If there are issues with referenced resources (for example, the post's author doesn't
        // exist), delete the post.
        if (exception instanceof SerializedApiException) {
            service.removePostById(postId);
        }
    }
}

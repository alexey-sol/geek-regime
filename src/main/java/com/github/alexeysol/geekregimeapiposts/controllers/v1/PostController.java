package com.github.alexeysol.geekregimeapiposts.controllers.v1;

import com.github.alexeysol.geekregimeapicommons.exceptions.BaseResourceException;
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceNotFoundException;
import com.github.alexeysol.geekregimeapicommons.models.ApiResource;
import com.github.alexeysol.geekregimeapiposts.constants.PathConstants;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.models.dtos.DetailedPost;
import com.github.alexeysol.geekregimeapiposts.services.v1.PostService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping(
    path = PathConstants.API_V1_PATH,
    produces = "application/json"
)
@Validated
public class PostController {
    private final PostService postService;

    PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    List<DetailedPost> getAllPosts(@RequestParam Optional<List<Long>> ids) {
        Iterable<Post> posts = ids.isPresent()
            ? postService.findAllPostsById(ids.get())
            : postService.findAllPosts();

        return postService.convertAllPostsToDetailedPosts(posts);
    }

    @GetMapping("{id}")
    DetailedPost getPostById(@PathVariable long id) throws BaseResourceException {
        Optional<Post> post = postService.findPostById(id);

        if (post.isEmpty()) {
            throw new ResourceNotFoundException(ApiResource.POST, id);
        }

        return postService.convertPostToDetailedPost(post.get());
    }

    @PostMapping
    DetailedPost postPost(@RequestBody @Valid Post dto) {
        Post post = postService.createPost(dto);
        return postService.convertPostToDetailedPost(post);
    }

    @DeleteMapping("{id}")
    long deletePostById(@PathVariable long id) throws BaseResourceException {
        long result = postService.removePostById(id);
        boolean postIsDeleted = result != -1;

        if (postIsDeleted) {
            return result;
        }

        throw new ResourceNotFoundException(ApiResource.POST, id);
    }
}

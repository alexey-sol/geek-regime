package com.github.alexeysol.geekregimeapiposts.controllers.v1;

import com.github.alexeysol.geekregimeapicommons.exceptions.BaseResourceException;
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceNotFoundException;
import com.github.alexeysol.geekregimeapicommons.models.ApiResource;
import com.github.alexeysol.geekregimeapiposts.constants.PathConstants;
import com.github.alexeysol.geekregimeapiposts.models.mappers.User;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.models.dtos.DetailedPost;
import com.github.alexeysol.geekregimeapiposts.services.v1.UserService;
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
    private final UserService userService;

    PostController(PostService postService, UserService userService) {
        this.postService = postService;
        this.userService = userService;
    }

    @GetMapping
    List<DetailedPost> getAllPosts(@RequestParam Optional<List<Long>> ids) {
        Iterable<Post> posts = ids.isPresent()
            ? postService.findAllPostsById(ids.get())
            : postService.findAllPosts();

        return postService.convertPostsToDetailedPosts(posts);
    }

    @GetMapping("{id}")
    DetailedPost getPostById(@PathVariable long id) throws BaseResourceException {
        Optional<Post> post = postService.findPostById(id);

        if (post.isEmpty()) {
            throw new ResourceNotFoundException(ApiResource.POST, id);
        }

        long authorId = post.get().getUserId();
        User author = userService.getUser(authorId);
        return new DetailedPost(post.get(), author);
    }

    @PostMapping
    DetailedPost postPost(@RequestBody @Valid Post dto) {
        long authorId = dto.getUserId();
        User author = userService.getUser(authorId);
        postService.createPost(dto);
        return new DetailedPost(dto, author);
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

package com.github.alexeysol.geekregimeapiposts.controllers.v1;

import com.github.alexeysol.geekregimeapiposts.constants.PathConstants;
import com.github.alexeysol.geekregimeapiposts.mappers.User;
import com.github.alexeysol.geekregimeapiposts.entities.Post;
import com.github.alexeysol.geekregimeapiposts.dtos.DetailedPost;
import com.github.alexeysol.geekregimeapiposts.exceptions.PostNotFoundException;
import com.github.alexeysol.geekregimeapiposts.services.v1.UserService;
import com.github.alexeysol.geekregimeapiposts.services.v1.PostService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

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
    List<Post> getAllPosts() {
        // TODO add authors
        return postService.findAllPosts();
    }

    @GetMapping("{id}")
    DetailedPost getPostById(@PathVariable int id) throws PostNotFoundException {
        Optional<Post> post = postService.findPostById(id);

        if (post.isEmpty()) {
            throw new PostNotFoundException(id);
        }

        User author = userService.getUser(post.get().getUserId());
        return new DetailedPost(post.get(), author);
    }

    @PostMapping
    DetailedPost postPost(@RequestBody @Valid Post dto) {
        User author = userService.getUser(dto.getUserId());
        // TODO throw UserNotFound if user == null
        postService.createPost(dto);
        return new DetailedPost(dto, author);
    }

    @DeleteMapping("{id}")
    int deletePostById(@PathVariable int id) throws PostNotFoundException {
        int result = postService.removePostById(id);
        boolean postIsDeleted = result != -1;

        if (postIsDeleted) {
            return result;
        }

        throw new PostNotFoundException(id);
    }
}

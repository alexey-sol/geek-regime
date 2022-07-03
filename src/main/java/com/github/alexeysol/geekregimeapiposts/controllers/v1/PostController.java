package com.github.alexeysol.geekregimeapiposts.controllers.v1;

import com.github.alexeysol.geekregimeapiposts.constants.PathConstants;
import com.github.alexeysol.geekregimeapiposts.entities.Post;
import com.github.alexeysol.geekregimeapiposts.exceptions.PostNotFoundException;
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
    private final PostService service;

    PostController(PostService service) {
        this.service = service;
    }

    @GetMapping
    List<Post> getAllPosts() {
        return service.findAllPosts();
    }

    @GetMapping("{id}")
    Optional<Post> getPostById(@PathVariable int id) throws PostNotFoundException {
        Optional<Post> post = service.findPostById(id);

        if (post.isPresent()) {
            return post;
        }

        throw new PostNotFoundException(id);
    }

    @PostMapping
    Post postPost(@RequestBody @Valid Post dto) {
        return service.createPost(dto);
    }

    @DeleteMapping("{id}")
    int deletePostById(@PathVariable int id) throws PostNotFoundException {
        int result = service.removePostById(id);
        boolean postIsDeleted = result != -1;

        if (postIsDeleted) {
            return result;
        }

        throw new PostNotFoundException(id);
    }
}

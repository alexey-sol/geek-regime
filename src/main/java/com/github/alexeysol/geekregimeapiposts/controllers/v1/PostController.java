package com.github.alexeysol.geekregimeapiposts.controllers.v1;

import com.github.alexeysol.geekregimeapicommons.constants.DefaultValueConstants;
import com.github.alexeysol.geekregimeapicommons.exceptions.BaseResourceException;
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceNotFoundException;
import com.github.alexeysol.geekregimeapicommons.models.ApiResource;
import com.github.alexeysol.geekregimeapicommons.utils.converters.QueryConverter;
import com.github.alexeysol.geekregimeapiposts.constants.PathConstants;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.models.dtos.DetailedPost;
import com.github.alexeysol.geekregimeapiposts.services.v1.PostService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    Page<DetailedPost> getAllPosts(
        @RequestParam Optional<String> paging,
        @RequestParam Optional<String> sortBy
    ) {
        QueryConverter queryConverter = new QueryConverter(
            paging.orElse(""),
            sortBy.orElse("")
        );

        Pageable pageable = queryConverter.getPageable();
        return postService.findAllPosts(pageable);
    }

    @GetMapping("{id}")
    DetailedPost getPostById(@PathVariable long id) throws BaseResourceException {
        Optional<DetailedPost> detailedPost = postService.findPostById(id);

        if (detailedPost.isPresent()) {
            return detailedPost.get();
        }

        throw new ResourceNotFoundException(ApiResource.POST, id);
    }

    @PostMapping
    DetailedPost postPost(@RequestBody @Valid Post dto) {
        return postService.createPost(dto);
    }

    @DeleteMapping("{id}")
    long deletePostById(@PathVariable long id) throws BaseResourceException {
        long result = postService.removePostById(id);
        boolean postIsDeleted = result != DefaultValueConstants.NOT_FOUND_BY_ID;

        if (postIsDeleted) {
            return result;
        }

        throw new ResourceNotFoundException(ApiResource.POST, id);
    }
}

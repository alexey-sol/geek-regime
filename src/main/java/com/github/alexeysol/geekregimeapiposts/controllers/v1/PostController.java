package com.github.alexeysol.geekregimeapiposts.controllers.v1;

import com.github.alexeysol.geekregimeapicommons.constants.ApiResource;
import com.github.alexeysol.geekregimeapicommons.constants.DefaultValueConstants;
import com.github.alexeysol.geekregimeapicommons.exceptions.BaseResourceException;
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceNotFoundException;
import com.github.alexeysol.geekregimeapicommons.models.Pair;
import com.github.alexeysol.geekregimeapicommons.models.dtos.RawPostDto;
import com.github.alexeysol.geekregimeapicommons.utils.converters.PageableConverter;
import com.github.alexeysol.geekregimeapiposts.constants.PathConstants;
import com.github.alexeysol.geekregimeapiposts.models.dtos.CreatePostDto;
import com.github.alexeysol.geekregimeapiposts.models.dtos.UpdatePostDto;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.services.v1.PostService;
import com.github.alexeysol.geekregimeapiposts.utils.mappers.PostMapper;
import org.modelmapper.MappingException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
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
    private final List<String> sortByUserFields = List.of(
        "author.details.name", "author.email", "createdAt", "id", "slug", "title", "updatedAt"
    );

    private final PostService postService;
    private final PostMapper postMapper;

    PostController(PostService postService, PostMapper postMapper) {
        this.postService = postService;
        this.postMapper = postMapper;
    }

    @GetMapping
    Page<RawPostDto> findAllPosts(
        @RequestParam Optional<String> paging,
        @RequestParam Optional<String> sortBy
    ) {
        PageableConverter pageableConverter = new PageableConverter(
            paging.orElse(""),
            sortBy.orElse(""),
            sortByUserFields
        );

        Pageable pageable = pageableConverter.getPageable();
        Page<Post> postsPage = postService.findAllPosts(pageable);
        List<RawPostDto> rawPostDtoList = postMapper.fromPostListToRawPostDtoList(postsPage.getContent());
        return new PageImpl<>(rawPostDtoList, pageable, postsPage.getTotalElements());
    }

    @GetMapping("{slug}")
    RawPostDto findPostBySlug(@PathVariable String slug) throws BaseResourceException {
        Optional<Post> post = postService.findPostBySlug(slug);

        if (post.isEmpty()) {
            throw new ResourceNotFoundException(ApiResource.POST, new Pair<>("slug", slug));
        }

        return postMapper.fromPostToRawPostDto(post.get());
    }

    @PostMapping
    RawPostDto createPost(@RequestBody @Valid CreatePostDto dto) throws Throwable {
        Post post = postMapper.fromCreatePostDtoToPost(dto);
        Post createdPost = postService.savePost(post);

        try {
            return postMapper.fromPostToRawPostDto(createdPost);
        } catch (MappingException exception) {
            Throwable cause = exception.getCause();
            cleanUpIfNeeded(cause, createdPost.getId());
            throw cause;
        }
    }

    @PatchMapping("{id}")
    RawPostDto updatePost(
        @PathVariable long id,
        @RequestBody @Valid UpdatePostDto dto
    ) {
        Optional<Post> optionalPost = postService.findPostById(id);

        if (optionalPost.isEmpty()) {
            throw new ResourceNotFoundException(ApiResource.POST, id);
        }

        Post post = postMapper.mapUpdatePostDtoToPost(dto, optionalPost.get());
        Post updatedPost = postService.savePost(post);
        return postMapper.fromPostToRawPostDto(updatedPost);
    }

    @DeleteMapping("{id}")
    long removePostById(@PathVariable long id) throws BaseResourceException {
        long result = postService.removePostById(id);
        boolean isNotFound = result == DefaultValueConstants.NOT_FOUND_BY_ID;

        if (isNotFound) {
            throw new ResourceNotFoundException(ApiResource.POST, id);
        }

        return result;
    }

    private void cleanUpIfNeeded(Throwable exception, long postId) {
        // If there are issues with referenced resources (for example, the post's author doesn't
        // exist), delete the post.
        if (exception instanceof BaseResourceException) {
            postService.removePostById(postId);
        }
    }
}

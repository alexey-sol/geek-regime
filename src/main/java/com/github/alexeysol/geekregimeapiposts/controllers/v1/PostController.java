package com.github.alexeysol.geekregimeapiposts.controllers.v1;

import com.github.alexeysol.geekregimeapicommons.constants.ApiResource;
import com.github.alexeysol.geekregimeapicommons.constants.DefaultValueConstants;
import com.github.alexeysol.geekregimeapicommons.exceptions.BaseResourceException;
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceNotFoundException;
import com.github.alexeysol.geekregimeapicommons.utils.converters.QueryConverter;
import com.github.alexeysol.geekregimeapiposts.constants.PathConstants;
import com.github.alexeysol.geekregimeapiposts.models.dtos.CreatePostDto;
import com.github.alexeysol.geekregimeapiposts.models.dtos.PostDto;
import com.github.alexeysol.geekregimeapiposts.models.dtos.UpdatePostDto;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.services.v1.PostService;
import com.github.alexeysol.geekregimeapiposts.utils.mappers.PostMapper;
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
    private final PostService postService;
    private final PostMapper postMapper;

    PostController(PostService postService, PostMapper postMapper) {
        this.postService = postService;
        this.postMapper = postMapper;
    }

    @GetMapping
    Page<PostDto> findAllPosts(
        @RequestParam Optional<String> paging,
        @RequestParam Optional<String> sortBy
    ) {
        QueryConverter queryConverter = new QueryConverter(
            paging.orElse(""),
            sortBy.orElse("")
        );

        Pageable pageable = queryConverter.getPageable();
        Page<Post> postsPage = postService.findAllPosts(pageable);
        List<PostDto> postDtos = postMapper.allEntitiesToPostDtos(postsPage.getContent());
        return new PageImpl<>(postDtos, pageable, postsPage.getTotalElements());
    }

    @GetMapping("{id}")
    PostDto findPostById(@PathVariable long id) throws BaseResourceException {
        Optional<Post> post = postService.findPostById(id);

        if (post.isEmpty()) {
            throw new ResourceNotFoundException(ApiResource.POST, id);
        }

        return postMapper.entityToPostDto(post.get());
    }

    @PostMapping
    PostDto createPost(@RequestBody @Valid CreatePostDto dto) {
        Post post = postMapper.createPostDtoToEntity(dto);
        Post createdPost = postService.savePost(post);
        return postMapper.entityToPostDto(createdPost);

    }

    @PatchMapping("{id}")
    PostDto updatePost(
        @PathVariable long id,
        @RequestBody @Valid UpdatePostDto dto
    ) {
        Post post = postMapper.updatePostDtoToEntity(dto, id);
        Post updatedPost = postService.savePost(post);
        return postMapper.entityToPostDto(updatedPost);
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
}

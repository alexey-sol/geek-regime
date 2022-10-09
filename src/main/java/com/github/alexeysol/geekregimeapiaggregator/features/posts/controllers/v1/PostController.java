package com.github.alexeysol.geekregimeapiaggregator.features.posts.controllers.v1;

import com.github.alexeysol.geekregimeapiaggregator.features.posts.constants.PostsPathConstants;
import com.github.alexeysol.geekregimeapiaggregator.features.posts.services.v1.PostService;
import com.github.alexeysol.geekregimeapiaggregator.features.posts.utils.mappers.PostMapper;
import com.github.alexeysol.geekregimeapicommons.exceptions.BaseResourceException;
import com.github.alexeysol.geekregimeapicommons.models.BasicPage;
import com.github.alexeysol.geekregimeapicommons.models.dtos.DeletionResultDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.PostDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.RawPostDto;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(
    path = PostsPathConstants.API_V1_PATH,
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
    BasicPage<PostDto> findAllPosts(
        @RequestParam Optional<String> paging,
        @RequestParam Optional<String> sortBy
    ) {
        BasicPage<RawPostDto> page = postService.findAllPosts(paging, sortBy);
        List<PostDto> postDtoList = postMapper.fromRawPostDtoListToPostDtoList(page.getContent());
        return page.convertContent(postDtoList);
    }

    @GetMapping("{slug}")
    PostDto findPostBySlug(@PathVariable String slug) throws BaseResourceException {
        RawPostDto rawPostDto = postService.findPostBySlug(slug);
        return postMapper.fromRawPostDtoToPostDto(rawPostDto);
    }

    @PostMapping
    PostDto createPost(@RequestBody String dto) {
        RawPostDto createdPost = postService.createPost(dto);
        return postMapper.fromRawPostDtoToPostDto(createdPost);
    }

    @PatchMapping("{id}")
    PostDto updatePost(
        @PathVariable long id,
        @RequestBody String dto
    ) {
        RawPostDto createdPost = postService.updatePost(id, dto);
        return postMapper.fromRawPostDtoToPostDto(createdPost);
    }

    @DeleteMapping("{id}")
    DeletionResultDto removePostById(@PathVariable long id) {
        return postService.removePostById(id);
    }
}

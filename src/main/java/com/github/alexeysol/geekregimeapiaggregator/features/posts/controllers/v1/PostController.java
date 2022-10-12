package com.github.alexeysol.geekregimeapiaggregator.features.posts.controllers.v1;

import com.github.alexeysol.geekregimeapiaggregator.features.posts.constants.PostsPathConstants;
import com.github.alexeysol.geekregimeapiaggregator.features.posts.services.v1.PostService;
import com.github.alexeysol.geekregimeapiaggregator.features.posts.utils.mappers.PostMapper;
import com.github.alexeysol.geekregimeapicommons.exceptions.SerializedApiException;
import com.github.alexeysol.geekregimeapicommons.models.BasicPage;
import com.github.alexeysol.geekregimeapicommons.models.dtos.DeletionResultDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.PostDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.RawPostDto;
import org.modelmapper.MappingException;
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
    private final PostService service;
    private final PostMapper mapper;

    PostController(PostService service, PostMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping
    BasicPage<PostDto> findAllPosts(
        @RequestParam Optional<String> paging,
        @RequestParam Optional<String> sortBy
    ) {
        BasicPage<RawPostDto> page = service.findAllPosts(paging, sortBy);
        List<PostDto> postDtoList = mapper.fromRawPostDtoListToPostDtoList(page.getContent());
        return page.convertContent(postDtoList);
    }

    @GetMapping("{slug}")
    PostDto findPostBySlug(@PathVariable String slug) {
        RawPostDto rawPostDto = service.findPostBySlug(slug);
        return mapper.fromRawPostDtoToPostDto(rawPostDto);
    }

    @PostMapping
    PostDto createPost(@RequestBody String dto) throws Throwable {
        RawPostDto createdPost = service.createPost(dto);

        try {
            return mapper.fromRawPostDtoToPostDto(createdPost);
        } catch (MappingException exception) {
            Throwable cause = exception.getCause();
            cleanUpIfNeeded(cause, createdPost.getId());
            throw cause;
        }
    }

    @PatchMapping("{id}")
    PostDto updatePost(
        @PathVariable long id,
        @RequestBody String dto
    ) {
        RawPostDto updatePost = service.updatePost(id, dto);
        return mapper.fromRawPostDtoToPostDto(updatePost);
    }

    @DeleteMapping("{id}")
    DeletionResultDto removePostById(@PathVariable long id) {
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

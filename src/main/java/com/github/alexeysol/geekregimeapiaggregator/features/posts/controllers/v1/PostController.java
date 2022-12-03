package com.github.alexeysol.geekregimeapiaggregator.features.posts.controllers.v1;

import com.github.alexeysol.geekregimeapiaggregator.features.posts.constants.PostsPathConstants;
import com.github.alexeysol.geekregimeapiaggregator.features.posts.services.v1.PostService;
import com.github.alexeysol.geekregimeapiaggregator.features.posts.utils.mappers.PostMapper;
import com.github.alexeysol.geekregimeapicommons.exceptions.SerializedApiException;
import com.github.alexeysol.geekregimeapicommons.models.BasicPage;
import com.github.alexeysol.geekregimeapicommons.models.dtos.*;
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
    BasicPage<PostPreviewView> findAllPosts(
        @RequestParam Optional<String> paging,
        @RequestParam Optional<String> sortBy
    ) {
        BasicPage<PostPreviewDto> page = service.findAllPosts(paging, sortBy);
        List<PostPreviewView> viewList = mapper.fromPostPreviewDtoListToViewList(page.getContent());
        return page.convertContent(viewList);
    }

    @GetMapping("{slug}")
    PostDetailsView findPostBySlug(@PathVariable String slug) {
        PostDetailsDto detailsDto = service.findPostBySlug(slug);
        return mapper.fromPostDetailsDtoToView(detailsDto);
    }

    @PostMapping
    PostDetailsView createPost(@RequestBody String dto) throws Throwable {
        PostDetailsDto detailsDto = service.createPost(dto);

        try {
            return mapper.fromPostDetailsDtoToView(detailsDto);
        } catch (MappingException exception) {
            Throwable cause = exception.getCause();
            cleanUpIfNeeded(cause, detailsDto.getId());
            throw cause;
        }
    }

    @PatchMapping("{id}")
    PostDetailsView updatePost(
        @PathVariable long id,
        @RequestBody String dto
    ) {
        PostDetailsDto updatePost = service.updatePost(id, dto);
        return mapper.fromPostDetailsDtoToView(updatePost);
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

package com.github.alexeysol.geekregime.apiaggregator.features.posts.controllers.v1;

import com.github.alexeysol.geekregime.apiaggregator.features.posts.constants.PostsPathConstants;
import com.github.alexeysol.geekregime.apiaggregator.features.posts.services.v1.PostService;
import com.github.alexeysol.geekregime.apiaggregator.features.posts.utils.mappers.PostMapper;
import com.github.alexeysol.geekregime.apicommons.exceptions.SerializedApiException;
import com.github.alexeysol.geekregime.apicommons.models.dtos.posts.PostDetailsDto;
import com.github.alexeysol.geekregime.apicommons.models.dtos.posts.PostDetailsView;
import com.github.alexeysol.geekregime.apicommons.models.dtos.posts.PostPreviewDto;
import com.github.alexeysol.geekregime.apicommons.models.dtos.posts.PostPreviewView;
import com.github.alexeysol.geekregime.apicommons.models.dtos.shared.HasIdDto;
import com.github.alexeysol.geekregime.apicommons.models.utils.BasicPage;
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

    @GetMapping("${api-posts.resource}")
    BasicPage<PostPreviewView> findAllPosts(
        @RequestParam Optional<String> paging,
        @RequestParam Optional<String> sortBy,
        @RequestParam Optional<String> searchBy
    ) {
        BasicPage<PostPreviewDto> page = service.findAllPosts(paging, sortBy, searchBy);
        List<PostPreviewView> viewList = mapper.fromPostPreviewDtoListToViewList(page.getContent());
        return page.convertContent(viewList);
    }

    @GetMapping("${api-users.resource}/{authorId}/${api-posts.resource}")
    BasicPage<PostPreviewView> findAllPostsByAuthor(
        @PathVariable long authorId,
        @RequestParam Optional<String> paging,
        @RequestParam Optional<String> sortBy,
        @RequestParam Optional<String> searchBy
    ) {
        BasicPage<PostPreviewDto> page = service.findAllPosts(authorId, paging, sortBy, searchBy);
        List<PostPreviewView> viewList = mapper.fromPostPreviewDtoListToViewList(page.getContent());
        return page.convertContent(viewList);
    }

    @GetMapping("${api-posts.resource}/{slug}")
    PostDetailsView findPostBySlug(@PathVariable String slug) {
        PostDetailsDto detailsDto = service.findPostBySlug(slug);
        return mapper.fromPostDetailsDtoToView(detailsDto);
    }

    @PostMapping("${api-posts.resource}")
    PostDetailsView createPost(@RequestBody String dto) throws Throwable {
        PostDetailsDto detailsDto = service.createPost(dto);

        try {
            return mapper.fromPostDetailsDtoToView(detailsDto);
        } catch (MappingException exception) {
            Throwable cause = exception.getCause();
            cleanUpIfNeeded(exception.getCause(), detailsDto.getId());
            throw cause;
        }
    }

    @PatchMapping("${api-posts.resource}/{id}")
    PostDetailsView updatePost(
        @PathVariable long id,
        @RequestBody String dto
    ) {
        PostDetailsDto updatePost = service.updatePost(id, dto);
        return mapper.fromPostDetailsDtoToView(updatePost);
    }

    @DeleteMapping("${api-posts.resource}/{id}")
    HasIdDto removePostById(@PathVariable long id) {
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

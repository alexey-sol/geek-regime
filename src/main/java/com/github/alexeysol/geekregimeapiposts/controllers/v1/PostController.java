package com.github.alexeysol.geekregimeapiposts.controllers.v1;

import com.github.alexeysol.geekregimeapicommons.constants.Defaults;
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceException;
import com.github.alexeysol.geekregimeapicommons.models.dtos.posts.PostDetailsDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.posts.PostPreviewDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.query.SearchByDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.shared.HasIdDto;
import com.github.alexeysol.geekregimeapicommons.models.exceptions.ErrorDetail;
import com.github.alexeysol.geekregimeapicommons.utils.converters.PageableConverter;
import com.github.alexeysol.geekregimeapicommons.utils.converters.SearchableConverter;
import com.github.alexeysol.geekregimeapiposts.constants.PathConstants;
import com.github.alexeysol.geekregimeapiposts.models.dtos.CreatePostDto;
import com.github.alexeysol.geekregimeapiposts.models.dtos.UpdatePostDto;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.services.v1.PostService;
import com.github.alexeysol.geekregimeapiposts.utils.mappers.PostMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping(
    path = PathConstants.API_V1_PATH,
    produces = "application/json"
)
@Validated
public class PostController {
    private static final String ID_FIELD = "id";
    private static final String SLUG_FIELD = "slug";

    private final List<String> sortableFields = List.of("createdAt", "id", "slug", "title",
        "updatedAt");

    private final List<String> searchableFields = List.of("title", "excerpt");

    private final PostService service;
    private final PostMapper mapper;

    PostController(PostService service, PostMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping
    Page<PostPreviewDto> findAllPosts(
        @RequestParam(required = false) String paging,
        @RequestParam(required = false) String sortBy,
        @RequestParam(required = false) String searchBy
    ) {
        PageableConverter pageableConverter = new PageableConverter(paging, sortBy, sortableFields);
        SearchableConverter searchableConverter = new SearchableConverter(searchBy, searchableFields);

        SearchByDto searchByDto;
        Pageable pageable;
        Page<Post> postsPage;

        try {
            searchByDto = searchableConverter.getValue();
            pageable = pageableConverter.getPageable();

            postsPage = (Objects.nonNull(searchByDto))
                ? service.searchPosts(searchByDto, pageable)
                : service.findAllPosts(pageable);
        } catch (IllegalArgumentException | ConstraintViolationException exception) {
            throw new ResourceException(HttpStatus.UNPROCESSABLE_ENTITY, exception.getMessage());
        }

        List<PostPreviewDto> dtoList = mapper.fromPostListToPostPreviewDtoList(postsPage.getContent());
        return new PageImpl<>(dtoList, pageable, postsPage.getTotalElements());
    }

    @GetMapping("{slug}")
    PostDetailsDto findPostBySlug(@PathVariable String slug) {
        Optional<Post> optionalPost = service.findPostBySlug(slug);

        if (optionalPost.isEmpty()) {
            throw new ResourceException(new ErrorDetail(ErrorDetail.Code.ABSENT, SLUG_FIELD));
        }

        return mapper.fromPostToPostDetailsDto(optionalPost.get());
    }

    @PostMapping
    PostDetailsDto createPost(@RequestBody @Valid CreatePostDto dto) {
        Post post = mapper.fromCreatePostDtoToPost(dto);
        Post createdPost = service.savePost(post);
        return mapper.fromPostToPostDetailsDto(createdPost);
    }

    @PatchMapping("{id}")
    PostDetailsDto updatePost(
        @PathVariable long id,
        @RequestBody @Valid UpdatePostDto dto
    ) {
        Optional<Post> optionalPost = service.findPostById(id);

        if (optionalPost.isEmpty()) {
            throw new ResourceException(new ErrorDetail(ErrorDetail.Code.ABSENT, ID_FIELD));
        }

        Post post = mapper.mapUpdatePostDtoToPost(dto, optionalPost.get());
        Post updatedPost = service.savePost(post);
        return mapper.fromPostToPostDetailsDto(updatedPost);
    }

    @DeleteMapping("{id}")
    HasIdDto removePostById(@PathVariable long id) {
        long result = service.removePostById(id);
        boolean isNotFound = result == Defaults.NOT_FOUND_BY_ID;

        if (isNotFound) {
            throw new ResourceException(new ErrorDetail(ErrorDetail.Code.ABSENT, ID_FIELD));
        }

        return mapper.fromIdToHasIdDto(id);
    }
}

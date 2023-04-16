package com.github.alexeysol.geekregime.apiposts.controllers.v1;

import com.github.alexeysol.geekregime.apicommons.constants.Defaults;
import com.github.alexeysol.geekregime.apicommons.constants.database.LogicalOperator;
import com.github.alexeysol.geekregime.apicommons.exceptions.ResourceException;
import com.github.alexeysol.geekregime.apicommons.models.dtos.posts.PostDetailsDto;
import com.github.alexeysol.geekregime.apicommons.models.dtos.posts.PostPreviewDto;
import com.github.alexeysol.geekregime.apicommons.models.dtos.query.FilterCriterion;
import com.github.alexeysol.geekregime.apicommons.models.dtos.shared.HasIdDto;
import com.github.alexeysol.geekregime.apicommons.models.exceptions.ErrorDetail;
import com.github.alexeysol.geekregime.apicommons.models.utils.EntityFilter;
import com.github.alexeysol.geekregime.apicommons.utils.converters.PageableConverter;
import com.github.alexeysol.geekregime.apiposts.constants.PathConstants;
import com.github.alexeysol.geekregime.apiposts.constants.PostConstants;
import com.github.alexeysol.geekregime.apiposts.models.dtos.CreatePostDto;
import com.github.alexeysol.geekregime.apiposts.models.dtos.UpdatePostDto;
import com.github.alexeysol.geekregime.apiposts.models.entities.Post;
import com.github.alexeysol.geekregime.apiposts.services.v1.PostService;
import com.github.alexeysol.geekregime.apiposts.utils.PostFilterUtils;
import com.github.alexeysol.geekregime.apiposts.utils.mappers.PostMapper;
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
    private final PostService service;
    private final PostMapper mapper;

    PostController(PostService service, PostMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping("users/{authorId}/${api-posts.resource}")
    Page<PostPreviewDto> findAllPostsByUser(
        @PathVariable long authorId,
        @RequestParam(required = false) String paging,
        @RequestParam(required = false) String sortBy,
        @RequestParam(required = false) String searchBy
    ) {
        var authorIdFilter = PostFilterUtils.createFilter(authorId, LogicalOperator.AND);
        var searchFilter = PostFilterUtils.createFilter(searchBy, LogicalOperator.OR);
        var compositeFilter = PostFilterUtils.createFilter(List.of(authorIdFilter, searchFilter),
            LogicalOperator.AND);

        return findPosts(paging, sortBy, compositeFilter);
    }

    @GetMapping("${api-posts.resource}")
    Page<PostPreviewDto> findAllPosts(
        @RequestParam(required = false) String paging,
        @RequestParam(required = false) String sortBy,
        @RequestParam(required = false) String searchBy
    ) {
        var searchFilter = PostFilterUtils.createFilter(searchBy, LogicalOperator.OR);
        var compositeFilter = PostFilterUtils.createFilter(searchFilter, LogicalOperator.AND);

        return findPosts(paging, sortBy, compositeFilter);
    }

    private Page<PostPreviewDto> findPosts(
        String paging,
        String sortBy,
        EntityFilter<EntityFilter<FilterCriterion>> filter
    ) {
        var pageableConverter = new PageableConverter(paging, sortBy, PostConstants.SORTABLE_FIELDS);

        Pageable pageable;
        Page<Post> postsPage;

        try {
            pageable = pageableConverter.getValue();
            postsPage = (Objects.isNull(filter))
                ? service.findAllPosts(pageable)
                : service.findAllPosts(pageable, filter);
        } catch (IllegalArgumentException | ConstraintViolationException exception) {
            throw new ResourceException(HttpStatus.UNPROCESSABLE_ENTITY, exception.getMessage());
        }

        var dtoList = mapper.fromPostListToPostPreviewDtoList(postsPage.getContent());
        return new PageImpl<>(dtoList, pageable, postsPage.getTotalElements());
    }

    @GetMapping("${api-posts.resource}/{slug}")
    PostDetailsDto findPostBySlug(@PathVariable String slug) {
        var optionalPost = service.findPostBySlug(slug);

        if (optionalPost.isEmpty()) {
            throw new ResourceException(new ErrorDetail(ErrorDetail.Code.ABSENT,
                PostConstants.SLUG_FIELD));
        }

        return mapper.fromPostToPostDetailsDto(optionalPost.get());
    }

    @PostMapping("${api-posts.resource}")
    PostDetailsDto createPost(@RequestBody @Valid CreatePostDto dto) {
        var post = mapper.fromCreatePostDtoToPost(dto);
        var createdPost = service.savePost(post);
        return mapper.fromPostToPostDetailsDto(createdPost);
    }

    @PatchMapping("${api-posts.resource}/{id}")
    PostDetailsDto updatePost(
        @PathVariable long id,
        @RequestBody @Valid UpdatePostDto dto
    ) {
        var optionalPost = service.findPostById(id);

        if (optionalPost.isEmpty()) {
            throw new ResourceException(new ErrorDetail(ErrorDetail.Code.ABSENT,
                PostConstants.ID_FIELD));
        }

        var post = mapper.mapUpdatePostDtoToPost(dto, optionalPost.get());
        var updatedPost = service.savePost(post);
        return mapper.fromPostToPostDetailsDto(updatedPost);
    }

    @DeleteMapping("${api-posts.resource}/{id}")
    HasIdDto removePostById(@PathVariable long id) {
        long result = service.removePostById(id);
        boolean isNotFound = result == Defaults.NOT_FOUND_BY_ID;

        if (isNotFound) {
            throw new ResourceException(new ErrorDetail(ErrorDetail.Code.ABSENT,
                PostConstants.ID_FIELD));
        }

        return mapper.fromIdToHasIdDto(id);
    }
}

package com.github.alexeysol.geekregime.apiposts.controller.v1;

import com.github.alexeysol.geekregime.apicommons.constant.Default;
import com.github.alexeysol.geekregime.apicommons.constant.database.LogicalOperator;
import com.github.alexeysol.geekregime.apicommons.exception.ResourceException;
import com.github.alexeysol.geekregime.apicommons.model.dto.post.PostDetailsDto;
import com.github.alexeysol.geekregime.apicommons.model.dto.post.PostPreviewDto;
import com.github.alexeysol.geekregime.apicommons.model.dto.query.FilterCriterion;
import com.github.alexeysol.geekregime.apicommons.model.dto.shared.HasIdDto;
import com.github.alexeysol.geekregime.apicommons.model.exception.ErrorDetail;
import com.github.alexeysol.geekregime.apicommons.model.util.EntityFilter;
import com.github.alexeysol.geekregime.apicommons.util.converter.PageableConverter;
import com.github.alexeysol.geekregime.apiposts.model.dtos.CreatePostDto;
import com.github.alexeysol.geekregime.apiposts.model.dtos.UpdatePostDto;
import com.github.alexeysol.geekregime.apiposts.model.entities.Post;
import com.github.alexeysol.geekregime.apiposts.service.v1.PostService;
import com.github.alexeysol.geekregime.apiposts.util.PostFilterUtil;
import com.github.alexeysol.geekregime.apiposts.mapper.PostMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import java.util.*;

import static com.github.alexeysol.geekregime.apiposts.constant.PathConstant.*;
import static com.github.alexeysol.geekregime.apiposts.constant.PostConstant.*;

@RestController
@RequestMapping(path = API_PREFIX_V1, produces = "application/json")
@Validated
@RequiredArgsConstructor
public class PostController {
    private final PostService service;
    private final PostMapper mapper;

    @GetMapping("users/{authorId}/posts")
    Page<PostPreviewDto> findAllPostsByAuthor(
        @PathVariable long authorId,
        @RequestParam(required = false) String paging,
        @RequestParam(required = false) String sortBy,
        @RequestParam(required = false) String searchBy
    ) {
        var authorIdFilter = PostFilterUtil.createFilter(authorId, LogicalOperator.AND);
        var searchFilter = PostFilterUtil.createFilter(searchBy, LogicalOperator.OR);
        var plainFilters = PostFilterUtil.combinePlainFilters(authorIdFilter, searchFilter);
        var compositeFilter = PostFilterUtil.createFilter(plainFilters, LogicalOperator.AND);

        return findPosts(paging, sortBy, compositeFilter);
    }

    @GetMapping("posts")
    Page<PostPreviewDto> findAllPosts(
        @RequestParam(required = false) String paging,
        @RequestParam(required = false) String sortBy,
        @RequestParam(required = false) String searchBy
    ) {
        var searchFilter = PostFilterUtil.createFilter(searchBy, LogicalOperator.OR);
        var compositeFilter = PostFilterUtil.createFilter(searchFilter, LogicalOperator.AND);

        return findPosts(paging, sortBy, compositeFilter);
    }

    private Page<PostPreviewDto> findPosts(
        String paging,
        String sortBy,
        EntityFilter<EntityFilter<FilterCriterion>> filter
    ) {
        var pageableConverter = new PageableConverter(paging, sortBy, SORTABLE_FIELDS);

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

    @GetMapping("posts/{slug}")
    PostDetailsDto findPostBySlug(@PathVariable String slug) {
        var optionalPost = service.findPostBySlug(slug);

        if (optionalPost.isEmpty()) {
            throw new ResourceException(new ErrorDetail(ErrorDetail.Code.ABSENT, SLUG_FIELD));
        }

        return mapper.fromPostToPostDetailsDto(optionalPost.get());
    }

    @PostMapping("posts")
    PostDetailsDto createPost(@RequestBody @Valid CreatePostDto dto) {
        var post = mapper.fromCreatePostDtoToPost(dto);
        var createdPost = service.savePost(post);
        return mapper.fromPostToPostDetailsDto(createdPost);
    }

    @PatchMapping("posts/{id}")
    PostDetailsDto updatePost(
        @PathVariable long id,
        @RequestBody @Valid UpdatePostDto dto
    ) {
        var optionalPost = service.findPostById(id);

        if (optionalPost.isEmpty()) {
            throw new ResourceException(new ErrorDetail(ErrorDetail.Code.ABSENT, ID_FIELD));
        }

        var post = mapper.mapUpdatePostDtoToPost(dto, optionalPost.get());
        var updatedPost = service.savePost(post);
        return mapper.fromPostToPostDetailsDto(updatedPost);
    }

    @DeleteMapping("posts/{id}")
    HasIdDto removePostById(@PathVariable long id) {
        long result = service.removePostById(id);
        boolean isNotFound = result == Default.NOT_FOUND_BY_ID;

        if (isNotFound) {
            throw new ResourceException(new ErrorDetail(ErrorDetail.Code.ABSENT, ID_FIELD));
        }

        return mapper.fromIdToHasIdDto(id);
    }
}

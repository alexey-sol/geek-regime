package com.github.alexeysol.geekregime.apiposts.controller.v1;

import com.github.alexeysol.geekregime.apicommons.constant.Default;
import com.github.alexeysol.geekregime.apicommons.constant.database.LogicalOperator;
import com.github.alexeysol.geekregime.apicommons.exception.ResourceException;
import com.github.alexeysol.geekregime.apicommons.generated.model.*;
import com.github.alexeysol.geekregime.apicommons.model.dto.query.FilterCriterion;
import com.github.alexeysol.geekregime.apicommons.model.exception.ErrorDetail;
import com.github.alexeysol.geekregime.apicommons.model.util.EntityFilter;
import com.github.alexeysol.geekregime.apiposts.generated.api.PostApi;
import com.github.alexeysol.geekregime.apiposts.mapper.PostMapper;
import com.github.alexeysol.geekregime.apiposts.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.service.v1.PostService;
import com.github.alexeysol.geekregime.apiposts.util.PostFilterUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.ConstraintViolationException;
import java.util.List;
import java.util.Objects;

import static com.github.alexeysol.geekregime.apicommons.constant.Default.*;
import static com.github.alexeysol.geekregime.apiposts.constant.PathConstant.*;
import static com.github.alexeysol.geekregime.apiposts.constant.PostConstant.*;

@RestController
@RequestMapping(path = API_PREFIX_V1, produces = "application/json")
@Validated
@RequiredArgsConstructor
public class PostController implements PostApi {
    private final PostService service;
    private final PostMapper mapper;
    private final PostService postService;

    @Override
    public ResponseEntity<PostPreviewPageResponse> findAllPostsByAuthor(
        Long authorId,
        List<String> searchIn,
        String text,
        @PageableDefault(size = PAGE_SIZE, sort = SORT_BY, direction = Sort.Direction.DESC) Pageable pageable
    ) {
        var searchFilter = getSearchFilterIfTextIsPresent(text, searchIn);
        var authorIdFilter = PostFilterUtil.createFilter(authorId, LogicalOperator.AND);
        var plainFilters = PostFilterUtil.combinePlainFilters(authorIdFilter, searchFilter);
        var compositeFilter = PostFilterUtil.createFilter(plainFilters, LogicalOperator.AND);

        var response = findPosts(pageable, compositeFilter);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PostPreviewPageResponse> findAllPosts(
        List<String> searchIn,
        String text,
        @PageableDefault(size = PAGE_SIZE, sort = SORT_BY, direction = Sort.Direction.DESC) Pageable pageable
    ) {
        var searchFilter = getSearchFilterIfTextIsPresent(text, searchIn);
        var compositeFilter = PostFilterUtil.createFilter(searchFilter, LogicalOperator.AND);

        var response = findPosts(pageable, compositeFilter);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private EntityFilter<FilterCriterion> getSearchFilterIfTextIsPresent(String text, List<String> searchIn) {
        if (Objects.isNull(text)) {
            return null;
        }

        return (Objects.isNull(searchIn) || searchIn.isEmpty())
            ? PostFilterUtil.createFilter(text, LogicalOperator.OR)
            : PostFilterUtil.createFilter(text, searchIn, LogicalOperator.OR);
    }

    private PostPreviewPageResponse findPosts(
        Pageable pageable,
        EntityFilter<EntityFilter<FilterCriterion>> filter
    ) {
        Page<Post> postPage;

        try {
            postPage = (Objects.isNull(filter))
                ? service.findAllPosts(pageable)
                : service.findAllPosts(pageable, filter);
        } catch (IllegalArgumentException | ConstraintViolationException exception) {
            throw new ResourceException(HttpStatus.UNPROCESSABLE_ENTITY, exception.getMessage());
        }

        var postPreviewList = mapper.toPostPreviewListResponse(postPage.getContent());

        return new PostPreviewPageResponse(postPreviewList, postPage.getSize(), postPage.getTotalElements());
    }

    @Override
    public ResponseEntity<PostDetailsResponse> findPostBySlug(String slug) {
        var optionalPost = service.findPostBySlug(slug);

        if (optionalPost.isEmpty()) {
            throw new ResourceException(new ErrorDetail(ErrorDetail.Code.ABSENT, SLUG_FIELD));
        }

        var post = optionalPost.get();

        postService.incrementViewCountAndSave(post.getId());
        post.getMeta().incrementViewCount();

        var response = mapper.toPostDetailsResponse(post);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PostDetailsResponse> createPost(CreatePostRequest request) {
        var post = mapper.toPost(request);
        post.getMeta().incrementViewCount();
        var createdPost = service.savePost(post);
        var response = mapper.toPostDetailsResponse(createdPost);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PostDetailsResponse> updatePost(UpdatePostRequest request, Long id) {
        var optionalPost = service.findPostById(id);

        if (optionalPost.isEmpty()) {
            throw new ResourceException(new ErrorDetail(ErrorDetail.Code.ABSENT, ID_FIELD));
        }

        var post = mapper.toPost(request, optionalPost.get());
        var updatedPost = service.savePost(post);
        var response = mapper.toPostDetailsResponse(updatedPost);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<IdResponse> removePostById(Long id) {
        var result = service.removePostById(id);
        var isNotFound = result == Default.NOT_FOUND_BY_ID;

        if (isNotFound) {
            throw new ResourceException(new ErrorDetail(ErrorDetail.Code.ABSENT, ID_FIELD));
        }

        var response = mapper.toIdResponse(id);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PostDetailsResponse> voteForPost(Long userId, Long postId, VoteForPostRequest request) {
        var optionalPost = service.findPostById(postId);

        if (optionalPost.isEmpty()) {
            throw new ResourceException(new ErrorDetail(ErrorDetail.Code.ABSENT, ID_FIELD));
        }

        var optionalPostVote = service.findPostVote(userId, postId);
        var post = optionalPost.get();

        var postVote = optionalPostVote.isPresent()
            ? mapper.toPostVote(request, optionalPostVote.get())
            : mapper.toPostVote(request, userId, post);

        service.savePostVote(postVote);
        service.updatePostRating(post);

        var response = mapper.toPostDetailsResponse(post);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

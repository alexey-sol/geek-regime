package com.github.alexeysol.geekregime.apiposts.feature.post.controller.v1;

import com.github.alexeysol.geekregime.apicommons.constant.Default;
import com.github.alexeysol.geekregime.apicommons.constant.database.LogicalOperator;
import com.github.alexeysol.geekregime.apicommons.exception.ResourceException;
import com.github.alexeysol.geekregime.apicommons.generated.model.*;
import com.github.alexeysol.geekregime.apiposts.feature.post.mapper.PostMapper;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.feature.post.service.v1.PostService;
import com.github.alexeysol.geekregime.apiposts.feature.post.util.PostSpecificationUtil;
import com.github.alexeysol.geekregime.apiposts.generated.api.PostApi;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.github.alexeysol.geekregime.apicommons.constant.Default.*;
import static com.github.alexeysol.geekregime.apiposts.feature.post.constant.PostConstant.*;
import static com.github.alexeysol.geekregime.apiposts.shared.constant.PathConstant.*;

@RestController
@RequestMapping(path = API_PREFIX_V1, produces = "application/json")
@Validated
@RequiredArgsConstructor
public class PostController implements PostApi {
    private static final String CREATED_AT = "createdAt";
    private static final String ID = "id";
    private static final String USER_ID = "userId";
    private static final String POSTS = "posts";

    private final PostService service;
    private final PostMapper mapper;

    @Override
    public ResponseEntity<BasePostPreviewPageResponse> findAllPostsByAuthor(
        Long authorId,
        List<String> searchIn,
        String text,
        PostPagePeriod period,
        @PageableDefault(size = PAGE_SIZE, sort = SORT_BY, direction = Sort.Direction.DESC) Pageable pageable
    ) {
        var searchTextFilter = PostSpecificationUtil.<Post>byLikeIgnoreCaseSearchText(text, searchIn);
        var searchPeriodFilter = PostSpecificationUtil.<Post>bySameOrAfterPeriod(CREATED_AT, period);
        var authorIdFilter = PostSpecificationUtil.<Post>byEqual(USER_ID, authorId);
        var composedSpecification = PostSpecificationUtil.compose(LogicalOperator.AND, searchTextFilter, searchPeriodFilter, authorIdFilter);

        var response = findPosts(pageable, composedSpecification);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<BasePostPreviewPageResponse> findAllPostsBySpace(
        Long spaceId,
        List<String> searchIn,
        String text,
        PostPagePeriod period,
        @PageableDefault(size = PAGE_SIZE, sort = SORT_BY, direction = Sort.Direction.DESC) Pageable pageable
    ) {
        var searchTextFilter = PostSpecificationUtil.<Post>byLikeIgnoreCaseSearchText(text, searchIn);
        var searchPeriodFilter = PostSpecificationUtil.<Post>bySameOrAfterPeriod(CREATED_AT, period);
        var spaceIdFilter = PostSpecificationUtil.<Post>byEqualAndIsMember(ID, spaceId, POSTS, Post.class);
        var composedSpecification = PostSpecificationUtil.compose(LogicalOperator.AND, searchTextFilter, searchPeriodFilter, spaceIdFilter);

        var response = findPosts(pageable, composedSpecification);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<BasePostPreviewPageResponse> findAllPosts(
        List<String> searchIn,
        String text,
        PostPagePeriod period,
        @PageableDefault(size = PAGE_SIZE, sort = SORT_BY, direction = Sort.Direction.DESC) Pageable pageable
    ) {
        var searchTextFilter = PostSpecificationUtil.<Post>byLikeIgnoreCaseSearchText(text, searchIn);
        var searchPeriodFilter = PostSpecificationUtil.<Post>bySameOrAfterPeriod(CREATED_AT, period);
        var composedSpecification = PostSpecificationUtil.compose(LogicalOperator.AND, searchTextFilter, searchPeriodFilter);

        var response = findPosts(pageable, composedSpecification);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private BasePostPreviewPageResponse findPosts(Pageable pageable, Specification<Post> specification) {
        Page<Post> postPage = service.findAllPosts(pageable, specification);
        var basePostPreviewList = mapper.toBasePostPreviewListResponse(postPage.getContent());

        return new BasePostPreviewPageResponse(basePostPreviewList, postPage.getSize(), postPage.getTotalElements());
    }

    @Override
    public ResponseEntity<BasePostDetailsResponse> findPostBySlug(String slug) {
        var optionalPost = service.findPostBySlug(slug);

        if (optionalPost.isEmpty()) {
            throw new ResourceException(ErrorCode.ABSENT, SLUG_FIELD);
        }

        var post = optionalPost.get();

        service.incrementViewCountAndSave(post.getId());
        post.getMeta().incrementViewCount();

        var response = mapper.toBasePostDetailsResponse(post);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<BasePostDetailsResponse> createPost(CreatePostRequest request) {
        var post = mapper.toPost(request);
        var createdPost = service.savePost(post);
        var response = mapper.toBasePostDetailsResponse(createdPost);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<BasePostDetailsResponse> updatePost(UpdatePostRequest request, Long id) {
        var optionalPost = service.findPostById(id);

        if (optionalPost.isEmpty()) {
            throw new ResourceException(ErrorCode.ABSENT, ID_FIELD);
        }

        var post = mapper.toPost(request, optionalPost.get());
        var updatedPost = service.savePost(post);
        var response = mapper.toBasePostDetailsResponse(updatedPost);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<IdResponse> removePostById(Long id) {
        var result = service.removePostById(id);

        if (result == Default.NOT_FOUND_BY_ID) {
            throw new ResourceException(ErrorCode.ABSENT, ID_FIELD);
        }

        var response = mapper.toIdResponse(id);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<BasePostDetailsResponse> voteOnPost(Long userId, Long postId, VoteOnPostRequest request) {
        var optionalPost = service.findPostById(postId);

        if (optionalPost.isEmpty()) {
            throw new ResourceException(ErrorCode.ABSENT, ID_FIELD);
        }

        var optionalPostVote = service.findPostVote(userId, postId);
        var post = optionalPost.get();

        var postVote = optionalPostVote.isPresent()
            ? mapper.toPostVote(request, optionalPostVote.get())
            : mapper.toPostVote(request, userId, post);

        service.savePostVote(postVote);
        service.updatePostRating(post);

        var response = mapper.toBasePostDetailsResponse(post);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

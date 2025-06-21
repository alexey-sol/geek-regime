package com.github.alexeysol.geekregime.apiposts.feature.post.controller.v1;

import com.github.alexeysol.geekregime.apicommons.constant.database.LogicalOperator;
import com.github.alexeysol.geekregime.apicommons.exception.ResourceException;
import com.github.alexeysol.geekregime.apicommons.generated.model.*;
import com.github.alexeysol.geekregime.apiposts.generated.api.PostCommentApi;
import com.github.alexeysol.geekregime.apiposts.feature.post.mapper.PostCommentMapper;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.PostComment;
import com.github.alexeysol.geekregime.apiposts.feature.post.service.v1.PostCommentService;
import com.github.alexeysol.geekregime.apiposts.feature.post.service.v1.PostService;
import com.github.alexeysol.geekregime.apiposts.shared.util.DataAccessHelper;
import com.github.alexeysol.geekregime.apiposts.shared.util.EntitySpecificationUtil;
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

import static com.github.alexeysol.geekregime.apicommons.constant.Default.*;
import static com.github.alexeysol.geekregime.apiposts.shared.constant.PathConstant.*;
import static com.github.alexeysol.geekregime.apiposts.feature.post.constant.PostConstant.*;

@RestController
@RequestMapping(path = API_PREFIX_V1, produces = "application/json")
@Validated
@RequiredArgsConstructor
public class PostCommentController implements PostCommentApi {
    private static final String CREATED_AT = "createdAt";
    private static final String IS_DELETED = "isDeleted";
    private static final String USER_ID = "userId";

    private final PostService postService;
    private final PostCommentService postCommentService;
    private final PostCommentMapper postCommentMapper;

    @Override
    public ResponseEntity<BasePostCommentPageResponse> findAllRootPostCommentsByAuthor(
        Long authorId,
        PagePeriod period,
        @PageableDefault(size = PAGE_SIZE, sort = SORT_BY, direction = Sort.Direction.DESC) Pageable pageable
    ) {
        var filterSpecification = EntitySpecificationUtil.<PostComment>compose(
            LogicalOperator.AND,
            EntitySpecificationUtil.bySameOrAfterPeriod(CREATED_AT, period),
            EntitySpecificationUtil.byEqual(USER_ID, authorId),
            EntitySpecificationUtil.byEqual(IS_DELETED, false)
        );

        var postCommentPage = postCommentService.findAllRootPostComments(filterSpecification, pageable);
        var response = toPageResponse(postCommentPage);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<BasePostCommentPageResponse> findAllRootPostCommentsByPost(
        Long postId,
        @PageableDefault(size = PAGE_SIZE, sort = SORT_BY, direction = Sort.Direction.DESC) Pageable pageable
    ) {
        var postCommentPage = postCommentService.findAllRootPostCommentsByPostId(postId, pageable);
        var response = toPageResponse(postCommentPage);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private BasePostCommentPageResponse toPageResponse(Page<PostComment> page) {
        var basePostCommentList = postCommentMapper.toBasePostCommentListResponse(page.getContent());
        return new BasePostCommentPageResponse(basePostCommentList, page.getSize(), page.getTotalElements());
    }

    @Override
    public ResponseEntity<BasePostCommentResponse> createPostComment(CreatePostCommentRequest request, Long id) {
        var parentPostExists = postService.existsById(request.getPostId());

        if (!parentPostExists) {
            throw new ResourceException(ErrorCode.ABSENT, ID_FIELD);
        }

        var postComment = postCommentMapper.toPostComment(request);
        var createdPostComment = postCommentService.savePostComment(postComment);

        var parentPostId = createdPostComment.getPost().getId();
        postCommentService.updatePostCommentCount(parentPostId);

        var response = postCommentMapper.toBasePostCommentResponse(createdPostComment);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<BasePostCommentResponse> updatePostComment(UpdatePostCommentRequest request, Long id) {
        var optionalPostComment = postCommentService.findPostCommentById(id);

        if (optionalPostComment.isEmpty()) {
            throw new ResourceException(ErrorCode.ABSENT, ID_FIELD);
        }

        var postComment = postCommentMapper.toPostComment(request, optionalPostComment.get());
        var updatedPostComment = postCommentService.savePostComment(postComment);

        var response = postCommentMapper.toBasePostCommentResponse(updatedPostComment);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<IdResponse> removePostCommentById(Long id) {
        var optionalParentPost = postCommentService.findPostCommentById(id).map(PostComment::getPost);
        var optionalPostComment = postCommentService.findPostCommentById(id);

        if (optionalPostComment.isEmpty()) {
            throw new ResourceException(ErrorCode.ABSENT, ID_FIELD);
        } else if (optionalPostComment.get().getIsDeleted()) {
            throw new ResourceException(ErrorCode.ALREADY_REMOVED, ID_FIELD);
        }

        postCommentService.softRemovePostComment(optionalPostComment.get());

        optionalParentPost.ifPresent(post -> postCommentService.updatePostCommentCount(post.getId()));

        var response = DataAccessHelper.getIdResponse(id);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<BasePostCommentTreeResponse> getPostCommentTreeByParentId(Long id) {
        var optionalPostComment = postCommentService.findPostCommentById(id);

        if (optionalPostComment.isEmpty()) {
            throw new ResourceException(ErrorCode.ABSENT, ID_FIELD);
        }

        var postComment = optionalPostComment.get();
        var response = postCommentMapper.toBasePostCommentTreeResponse(postComment);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

package com.github.alexeysol.geekregime.apiposts.mapper;

import com.github.alexeysol.geekregime.apicommons.generated.model.*;
import com.github.alexeysol.geekregime.apiposts.model.entity.PostComment;
import com.github.alexeysol.geekregime.apiposts.service.v1.PostCommentService;
import com.github.alexeysol.geekregime.apiposts.service.v1.PostService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PostCommentMapper extends BasePostCommentMapper {
    private final PostCommentService postCommentService;

    public PostCommentMapper(ModelMapper modelMapper, PostService postService, PostCommentService postCommentService) {
        super(modelMapper, postService);
        this.postCommentService = postCommentService;
    }

    public List<BasePostCommentResponse> toBasePostCommentListResponse(List<PostComment> postComments) {
        return postComments.stream()
            .map(this::toBasePostCommentResponse)
            .toList();
    }

    public BasePostCommentResponse toBasePostCommentResponse(PostComment postComment) {
        var response = modelMapper.map(postComment, BasePostCommentResponse.class);

        var descendantCount = postCommentService.countAllDescendantsByParentId(postComment.getId());
        response.setDescendantCount(descendantCount);

        return response;
    }

    public BasePostCommentTreeResponse toBasePostCommentTreeResponse(PostComment postComment) {
        return modelMapper.map(postComment, BasePostCommentTreeResponse.class);
    }

    public PostComment toPostComment(CreatePostCommentRequest request) {
        return modelMapper.map(request, PostComment.class);
    }

    public PostComment toPostComment(UpdatePostCommentRequest request, PostComment postComment) {
        modelMapper.map(request, postComment);
        return postComment;
    }

    public IdResponse toIdResponse(Long id) {
        return new IdResponse(id);
    }
}

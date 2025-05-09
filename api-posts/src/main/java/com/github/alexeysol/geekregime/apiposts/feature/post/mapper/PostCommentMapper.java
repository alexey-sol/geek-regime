package com.github.alexeysol.geekregime.apiposts.feature.post.mapper;

import com.github.alexeysol.geekregime.apicommons.generated.model.*;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.PostComment;
import com.github.alexeysol.geekregime.apiposts.feature.post.service.v1.PostCommentService;
import com.github.alexeysol.geekregime.apiposts.feature.post.service.v1.PostService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class PostCommentMapper extends BasePostCommentMapper {
    public PostCommentMapper(ModelMapper modelMapper, PostService postService, PostCommentService postCommentService) {
        super(modelMapper, postService, postCommentService);
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
        var response = modelMapper.map(postComment, BasePostCommentTreeResponse.class);
        sortAllRepliesInTree(response, 0);

        return response;
    }

    private void sortAllRepliesInTree(BasePostCommentTreeResponse postComment, int depth) {
        sortRepliesByCreatedAtAsc(postComment);

        for (BasePostCommentTreeResponse reply : postComment.getReplies()) {
            sortAllRepliesInTree(reply, depth + 1);
        }
    }

    private void sortRepliesByCreatedAtAsc(BasePostCommentTreeResponse postComment) {
        var modifiableReplies = new ArrayList<>(postComment.getReplies());

        modifiableReplies.sort(new Comparator<BasePostCommentTreeResponse>() {
            public int compare(BasePostCommentTreeResponse left, BasePostCommentTreeResponse right) {
                return (Objects.nonNull(left.getCreatedAt()) && Objects.nonNull(right.getCreatedAt()))
                    ? left.getCreatedAt().compareTo(right.getCreatedAt())
                    : 0;
            }
        });

        postComment.setReplies(Collections.unmodifiableList(modifiableReplies));
    }

    public PostComment toPostComment(CreatePostCommentRequest request) {
        return modelMapper.map(request, PostComment.class);
    }

    public PostComment toPostComment(UpdatePostCommentRequest request, PostComment postComment) {
        modelMapper.map(request, postComment);
        return postComment;
    }
}

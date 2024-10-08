package com.github.alexeysol.geekregime.apiposts.mapper;

import com.github.alexeysol.geekregime.apicommons.generated.model.*;
import com.github.alexeysol.geekregime.apiposts.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.model.entity.PostVote;
import com.github.alexeysol.geekregime.apiposts.service.v1.PostService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PostMapper extends BasePostMapper {
    public PostMapper(ModelMapper modelMapper, PostService service) {
        super(modelMapper, service);
    }

    public List<PostPreviewResponse> toPostPreviewListResponse(List<Post> posts) {
        return posts.stream()
            .map(this::toPostPreviewResponse)
            .toList();
    }

    public PostPreviewResponse toPostPreviewResponse(Post post) {
        return modelMapper.map(post, PostPreviewResponse.class);
    }

    public PostDetailsResponse toPostDetailsResponse(Post post) {
        return modelMapper.map(post, PostDetailsResponse.class);
    }

    public Post toPost(CreatePostRequest request) {
        return modelMapper.map(request, Post.class);
    }

    public Post toPost(UpdatePostRequest request, Post post) {
        modelMapper.map(request, post);
        return post;
    }

    public PostVote toPostVote(VoteForPostRequest request, PostVote postVote) {
        modelMapper.map(request, postVote);
        return postVote;
    }

    public PostVote toPostVote(VoteForPostRequest request, Long userId, Post post) {
        return PostVote.builder()
            .userId(userId)
            .post(post)
            .value(request.getValue())
            .build();
    }

    public IdResponse toIdResponse(Long id) {
        return new IdResponse(id);
    }
}

package com.github.alexeysol.geekregime.apiposts.feature.post.mapper;

import com.github.alexeysol.geekregime.apicommons.generated.model.*;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.PostVote;
import com.github.alexeysol.geekregime.apiposts.feature.post.service.v1.PostService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PostMapper extends BasePostMapper {
    public PostMapper(ModelMapper modelMapper, PostService service) {
        super(modelMapper, service);
    }

    public List<BasePostPreviewResponse> toBasePostPreviewListResponse(List<Post> posts) {
        return posts.stream()
            .map(this::toBasePostPreviewResponse)
            .toList();
    }

    public BasePostPreviewResponse toBasePostPreviewResponse(Post post) {
        return modelMapper.map(post, BasePostPreviewResponse.class);
    }

    public BasePostDetailsResponse toBasePostDetailsResponse(Post post) {
        return modelMapper.map(post, BasePostDetailsResponse.class);
    }

    public Post toPost(CreatePostRequest request) {
        return modelMapper.map(request, Post.class);
    }

    public Post toPost(UpdatePostRequest request, Post post) {
        modelMapper.map(request, post);
        return post;
    }

    public PostVote toPostVote(VoteOnPostRequest request, PostVote postVote) {
        modelMapper.map(request, postVote);
        return postVote;
    }

    public PostVote toPostVote(VoteOnPostRequest request, Long userId, Post post) {
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

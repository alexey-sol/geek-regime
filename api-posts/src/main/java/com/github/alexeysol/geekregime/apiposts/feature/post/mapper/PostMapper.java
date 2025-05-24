package com.github.alexeysol.geekregime.apiposts.feature.post.mapper;

import com.github.alexeysol.geekregime.apicommons.generated.model.*;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.PostVote;
import com.github.alexeysol.geekregime.apiposts.feature.post.service.v1.PostService;
import com.github.alexeysol.geekregime.apiposts.feature.space.mapper.SpaceMapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;

@Component
public class PostMapper extends BasePostMapper {
    private final SpaceMapper spaceMapper;

    public PostMapper(ModelMapper modelMapper, PostService postService, SpaceMapper spaceMapper) {
        super(modelMapper, postService);
        this.spaceMapper = spaceMapper;
    }

    public List<BasePostPreviewResponse> toBasePostPreviewResponseList(List<Post> posts) {
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

    public void setSpaces(Post post, List<SaveSpaceRequest> requests) {
        if (Objects.isNull(requests) || requests.isEmpty()) {
            return;
        }

        var spacesToPersist = spaceMapper.toSpaceList(requests);
        post.setSpaces(spacesToPersist);
    }
}

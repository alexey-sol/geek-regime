package com.github.alexeysol.geekregime.apiposts.feature.post.mapper;

import com.github.alexeysol.geekregime.apicommons.generated.model.*;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.PostVote;
import com.github.alexeysol.geekregime.apiposts.feature.post.service.v1.PostService;
import com.github.alexeysol.geekregime.apiposts.feature.space.model.entity.Space;
import com.github.alexeysol.geekregime.apiposts.feature.space.service.SpaceService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Component
public class PostMapper extends BasePostMapper {
    private final SpaceService spaceService;

    public PostMapper(ModelMapper modelMapper, PostService postService, SpaceService spaceService) {
        super(modelMapper, postService);
        this.spaceService = spaceService;
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
        var post = modelMapper.map(request, Post.class);

        var spacesToPersist = getSpacesToPersist(post.getSpaces());
        post.setSpaces(spacesToPersist);

        return post;
    }

    public Post toPost(UpdatePostRequest request, Post post) {
        modelMapper.map(request, post);

        var spacesToPersist = getSpacesToPersist(post.getSpaces());
        post.setSpaces(spacesToPersist);

        return post;
    }

    private List<Space> getSpacesToPersist(List<Space> spaces) {
        if (Objects.isNull(spaces)) {
            return new ArrayList<>();
        }

        var spaceSlugs = spaces.stream().map(Space::getSlug).toList();
        var existingSpaces = spaceService.findAllSpacesBySlugs(spaceSlugs);

        var newSpaces = spaces.stream().filter(space ->
            existingSpaces.stream().noneMatch(existingSpace ->
                existingSpace.getSlug().equals(space.getSlug()))).toList();

        var spacesToPersist = new ArrayList<>(existingSpaces);
        spacesToPersist.addAll(newSpaces);

        return spacesToPersist;
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

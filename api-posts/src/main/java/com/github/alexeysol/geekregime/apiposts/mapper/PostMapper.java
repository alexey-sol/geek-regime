package com.github.alexeysol.geekregime.apiposts.mapper;

import com.github.alexeysol.geekregime.apicommons.generated.model.IdResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.PostDetailsResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.PostPreviewResponse;
import com.github.alexeysol.geekregime.apiposts.generated.model.CreatePostRequest;
import com.github.alexeysol.geekregime.apiposts.generated.model.UpdatePostRequest;
import com.github.alexeysol.geekregime.apiposts.model.entity.Post;
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

    public IdResponse toIdResponse(Long id) {
        return new IdResponse(id);
    }
}

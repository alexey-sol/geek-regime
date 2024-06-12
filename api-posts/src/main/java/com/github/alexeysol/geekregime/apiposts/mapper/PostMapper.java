package com.github.alexeysol.geekregime.apiposts.mapper;

import com.github.alexeysol.geekregime.apicommons.model.dto.post.PostDetailsDto;
import com.github.alexeysol.geekregime.apicommons.model.dto.post.PostPreviewDto;
import com.github.alexeysol.geekregime.apicommons.model.dto.shared.HasIdDto;
import com.github.alexeysol.geekregime.apiposts.model.dtos.CreatePostDto;
import com.github.alexeysol.geekregime.apiposts.model.dtos.UpdatePostDto;
import com.github.alexeysol.geekregime.apiposts.model.entities.Post;
import com.github.alexeysol.geekregime.apiposts.service.v1.PostService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class PostMapper extends BasePostMapper {
    public PostMapper(ModelMapper modelMapper, PostService service) {
        super(modelMapper, service);
    }

    public List<PostPreviewDto> fromPostListToPostPreviewDtoList(List<Post> posts) {
        return posts.stream()
            .map(this::fromPostToPostPreviewDto)
            .toList();
    }

    public PostPreviewDto fromPostToPostPreviewDto(Post post) {
        return modelMapper.map(post, PostPreviewDto.class);
    }

    public PostDetailsDto fromPostToPostDetailsDto(Post post) {
        return modelMapper.map(post, PostDetailsDto.class);
    }

    public Post fromCreatePostDtoToPost(CreatePostDto dto) {
        return modelMapper.map(dto, Post.class);
    }

    public Post mapUpdatePostDtoToPost(UpdatePostDto dto, Post post) {
        modelMapper.map(dto, post);
        return post;
    }

    public HasIdDto fromIdToHasIdDto(long id) {
        return new HasIdDto(id);
    }
}

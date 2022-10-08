package com.github.alexeysol.geekregimeapiposts.utils.mappers;

import com.github.alexeysol.geekregimeapicommons.models.dtos.RawPostDto;
import com.github.alexeysol.geekregimeapiposts.models.dtos.*;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.services.v1.PostService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class PostMapper extends BasePostMapper {
    public PostMapper(ModelMapper modelMapper, PostService postService) {
        super(modelMapper, postService);
    }

    public List<RawPostDto> fromPostListToRawPostDtoList(List<Post> posts) {
        return posts.stream()
            .map(this::fromPostToRawPostDto)
            .toList();
    }

    public RawPostDto fromPostToRawPostDto(Post post) {
        return modelMapper.map(post, RawPostDto.class);
    }

    public Post fromCreatePostDtoToPost(CreatePostDto dto) {
        return modelMapper.map(dto, Post.class);
    }

    public Post mapUpdatePostDtoToPost(UpdatePostDto dto, Post post) {
        modelMapper.map(dto, post);
        return post;
    }
}

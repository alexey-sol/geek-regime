package com.github.alexeysol.geekregimeapiposts.utils.mappers;

import com.github.alexeysol.geekregimeapicommons.models.dtos.DeletionResultDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.PostDetailsDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.PostPreviewDto;
import com.github.alexeysol.geekregimeapiposts.models.dtos.*;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.services.v1.PostService;
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

    public DeletionResultDto fromIdToDeletionResultDto(long id) {
        return new DeletionResultDto(id);
    }
}

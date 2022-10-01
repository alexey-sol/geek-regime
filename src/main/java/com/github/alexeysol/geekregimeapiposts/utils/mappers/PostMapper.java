package com.github.alexeysol.geekregimeapiposts.utils.mappers;

import com.github.alexeysol.geekregimeapicommons.constants.ApiResource;
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceNotFoundException;
import com.github.alexeysol.geekregimeapiposts.models.dtos.*;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.services.v1.PostService;
import com.github.alexeysol.geekregimeapiposts.services.v1.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class PostMapper extends BasePostMapper {
    public PostMapper(ModelMapper modelMapper, PostService postService, UserService userService) {
        super(modelMapper, postService, userService);
    }

    public List<UserDto> fromPostListToUserDtoList(List<Post> posts) {
        PostList postList = new PostList();
        postList.setList(posts);
        return modelMapper.map(postList, UserDtoList.class).getList();
    }

    public List<PostDto> fromPostListToPostDtoList(List<Post> posts) {
        Map<Long, UserDto> mapAuthorIdToAuthor = getMapAuthorIdToAuthor(posts);

        return posts.stream()
            .map(post -> {
                UserDto author = mapAuthorIdToAuthor.get(post.getUserId());
                return fromPostToPostDtoWithProvidedAuthor(post, author);
            })
            .toList();
    }

    private Map<Long, UserDto> getMapAuthorIdToAuthor(List<Post> posts) {
        return fromPostListToUserDtoList(posts).stream()
            .collect(Collectors.toMap(UserDto::getId, Function.identity()));
    }

    public PostDto fromPostToPostDtoWithProvidedAuthor(Post post, UserDto author) {
        PartialPostDto partialDto = fromPostToPartialPostDto(post);
        partialDto.setAuthor(author);
        return partialDto;
    }

    public PostDto fromPostToPostDto(Post post) {
        return modelMapper.map(post, PostDto.class);
    }

    public PartialPostDto fromPostToPartialPostDto(Post post) {
        return modelMapper.map(post, PartialPostDto.class);
    }

    public Post fromCreatePostDtoToPost(CreatePostDto dto) {
        return modelMapper.map(dto, Post.class);
    }

    public Post fromUpdatePostDtoToPost(UpdatePostDto dto, long postId) {
        Optional<Post> optionalEntity = postService.findPostById(postId);

        if (optionalEntity.isEmpty()) {
            throw new ResourceNotFoundException(ApiResource.POST, postId);
        }

        Post entity = optionalEntity.get();
        modelMapper.map(dto, entity);
        return entity;
    }
}

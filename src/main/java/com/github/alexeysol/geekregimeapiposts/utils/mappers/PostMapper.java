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

    public List<UserDto> allEntitiesToUserDtos(List<Post> posts) {
        PostList postList = new PostList();
        postList.setValue(posts);
        return modelMapper.map(postList, UserDtoList.class).getValue();
    }

    public List<PostDto> allEntitiesToPostDtos(List<Post> posts) {
        Map<Long, UserDto> mapAuthorIdToAuthor = getMapAuthorIdToAuthor(posts);

        return posts.stream()
            .map(post -> {
                UserDto author = mapAuthorIdToAuthor.get(post.getUserId());
                return postToPostDtoWithProvidedAuthor(post, author);
            })
            .toList();
    }

    private Map<Long, UserDto> getMapAuthorIdToAuthor(List<Post> posts) {
        return allEntitiesToUserDtos(posts).stream()
            .collect(Collectors.toMap(UserDto::getId, Function.identity()));
    }

    public PostDto postToPostDtoWithProvidedAuthor(Post post, UserDto author) {
        PartialPostDto partialDto = entityToPartialPostDto(post);
        partialDto.setAuthor(author);
        return partialDto;
    }

    public PostDto entityToPostDto(Post post) {
        return modelMapper.map(post, PostDto.class);
    }

    public PartialPostDto entityToPartialPostDto(Post post) {
        return modelMapper.map(post, PartialPostDto.class);
    }

    public Post createPostDtoToEntity(CreatePostDto dto) {
        Post entity = modelMapper.map(dto, Post.class);
        generateAndSetSlug(entity);
        return entity;
    }

    public Post updatePostDtoToEntity(UpdatePostDto dto, long postId) {
        Optional<Post> optionalEntity = postService.findPostById(postId);

        if (optionalEntity.isEmpty()) {
            throw new ResourceNotFoundException(ApiResource.POST, postId);
        }

        Post entity = optionalEntity.get();
        boolean titleChanged = hasNewPostTitle(entity, dto);

        modelMapper.map(dto, entity);

        if (titleChanged) {
            generateAndSetSlug(entity);
        }

        return entity;
    }

    private boolean hasNewPostTitle(Post entity, UpdatePostDto dto) {
        String oldTitle = entity.getTitle();
        String newTitle = dto.getTitle();
        return !Objects.equals(oldTitle, newTitle);
    }

    private void generateAndSetSlug(Post entity) {
        entity.generateAndSetSlug();

        if (postService.postAlreadyExists(entity.getSlug())) {
            entity.attachSuffixToSlug();
        }
    }
}

package com.github.alexeysol.geekregimeapiposts.utils.mappers;

import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceNotFoundException;
import com.github.alexeysol.geekregimeapicommons.models.ApiResource;
import com.github.alexeysol.geekregimeapiposts.models.dtos.CreatePostDto;
import com.github.alexeysol.geekregimeapiposts.models.dtos.PostDto;
import com.github.alexeysol.geekregimeapiposts.models.dtos.UpdatePostDto;
import com.github.alexeysol.geekregimeapiposts.models.dtos.UserDto;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.services.v1.PostService;
import com.github.alexeysol.geekregimeapiposts.services.v1.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Component
public class PostMapper {
    private final ModelMapper modelMapper;
    private final PostService postService;
    private final UserService userService;

    public PostMapper(ModelMapper modelMapper, PostService postService, UserService userService) {
        this.modelMapper = modelMapper;
        this.postService = postService;
        this.userService = userService;

        // Attach the corresponding author to each post DTO.
        modelMapper.createTypeMap(Post.class, PostDto.class)
            .addMappings(mapper -> mapper
                .using(context -> getAuthorById((long) context.getSource()))
                .map(Post::getUserId, PostDto::setAuthor));
    }

    public List<PostDto> allEntitiesToPostDtos(Iterable<Post> posts) {
        List<PostDto> postDtos = new ArrayList<>();
        posts.forEach(post -> postDtos.add(entityToPostDto(post)));
        return postDtos;
    }

    public PostDto entityToPostDto(Post post) {
        return modelMapper.map(post, PostDto.class);
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
        String oldTitle = entity.getTitle();
        String newTitle = dto.getTitle();
        boolean titleChanged = !Objects.equals(oldTitle, newTitle);

        modelMapper.map(dto, entity);

        if (titleChanged) {
            generateAndSetSlug(entity);
        }

        return entity;
    }

    private void generateAndSetSlug(Post entity) {
        entity.generateAndSetSlug();

        if (postService.postAlreadyExists(entity.getSlug())) {
            entity.attachSuffixToSlug();
        }
    }

    private UserDto getAuthorById(long id) {
        return userService.getUser(id);
    }
}

package com.github.alexeysol.geekregimeapiposts.utils.mappers;

import com.github.alexeysol.geekregimeapiposts.models.dtos.*;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.services.v1.PostService;
import com.github.alexeysol.geekregimeapiposts.services.v1.UserService;
import com.github.alexeysol.geekregimeapiposts.utils.ObjectCasting;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

public abstract class BasePostMapper {
    protected final ModelMapper modelMapper;
    protected final PostService postService;
    protected final UserService userService;

    static protected class UserDtoList {
        private List<UserDto> userDtos;

        public List<UserDto> getValue() {
            return userDtos;
        }

        public void setValue(List<UserDto> userDtos) {
            this.userDtos = userDtos;
        }
    }

    static protected class PostList {
        private List<Post> posts;

        public List<Post> getValue() {
            return posts;
        }

        public void setValue(List<Post> posts) {
            this.posts = posts;
        }

        public List<Long> getAuthorIds() {
            return posts
                .stream()
                .map(Post::getUserId)
                .collect(Collectors.toList());
        }
    }

    public BasePostMapper(ModelMapper modelMapper, PostService postService, UserService userService) {
        this.modelMapper = modelMapper;
        this.postService = postService;
        this.userService = userService;
        init(modelMapper);
    }

    private void init(ModelMapper modelMapper) {
        // Attach the corresponding author to each post DTO.
        modelMapper.createTypeMap(Post.class, PostDto.class)
            .addMappings(mapper -> mapper
                .using(context -> getAuthorById((long) context.getSource()))
                .map(Post::getUserId, PostDto::setAuthor));

        modelMapper.createTypeMap(PostList.class, UserDtoList.class)
            .addMappings(mapper -> mapper
                .using(context -> {
                    Object source = context.getSource();
                    List<Long> authorIds = ObjectCasting.objectToList(source, Long.class);
                    return getAllAuthorsById(authorIds);
                })
                .map(PostList::getAuthorIds, UserDtoList::setValue));
    }

    private UserDto getAuthorById(long id) {
        return userService.findUserById(id);
    }

    private List<UserDto> getAllAuthorsById(List<Long> authorsIds) {
        return userService.findAllUsers(authorsIds);
    }
}

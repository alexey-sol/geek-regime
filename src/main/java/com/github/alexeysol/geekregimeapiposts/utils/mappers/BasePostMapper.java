package com.github.alexeysol.geekregimeapiposts.utils.mappers;

import com.github.alexeysol.geekregimeapiposts.models.dtos.*;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.services.v1.PostService;
import com.github.alexeysol.geekregimeapiposts.services.v1.UserService;
import com.github.alexeysol.geekregimeapiposts.utils.ObjectCasting;
import org.modelmapper.ModelMapper;

import java.util.List;

public abstract class BasePostMapper {
    protected final ModelMapper modelMapper;
    protected final PostService postService;
    protected final UserService userService;

    static protected class UserDtoList {
        private List<UserDto> list;

        public List<UserDto> getList() {
            return list;
        }

        public void setList(List<UserDto> list) {
            this.list = list;
        }
    }

    static protected class PostList {
        private List<Post> list;

        public List<Post> getList() {
            return list;
        }

        public void setList(List<Post> list) {
            this.list = list;
        }

        public List<Long> getAuthorIds() {
            return list.stream()
                .map(Post::getUserId)
                .toList();
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
                    List<Long> authorIds = ObjectCasting.objectToList(source, Long.class)
                        .stream()
                        .distinct()
                        .toList();

                    return getAllAuthorsById(authorIds);
                })
                .map(PostList::getAuthorIds, UserDtoList::setList));
    }

    private UserDto getAuthorById(long id) {
        return userService.findUserById(id);
    }

    private List<UserDto> getAllAuthorsById(List<Long> authorsIds) {
        return userService.findAllUsers(authorsIds);
    }
}

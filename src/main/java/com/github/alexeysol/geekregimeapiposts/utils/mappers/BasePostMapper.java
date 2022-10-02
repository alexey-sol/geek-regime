package com.github.alexeysol.geekregimeapiposts.utils.mappers;

import com.github.alexeysol.geekregimeapiposts.models.dtos.*;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.services.v1.PostService;
import com.github.alexeysol.geekregimeapiposts.services.v1.UserService;
import com.github.alexeysol.geekregimeapiposts.utils.ObjectCasting;
import com.github.alexeysol.geekregimeapiposts.utils.mappers.converters.BodyToExcerptConverter;
import com.github.alexeysol.geekregimeapiposts.utils.mappers.converters.TitleToSlugConverter;
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
                .distinct()
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
        modelMapper.createTypeMap(Post.class, PostDto.class)
            .addMappings(mapper -> mapper
                .using(context -> userService.findUserById((long) context.getSource()))
                .map(Post::getUserId, PostDto::setAuthor));

        // Attach the corresponding author to each post DTO.
        modelMapper.createTypeMap(PostList.class, UserDtoList.class)
            .addMappings(mapper -> mapper
                .using(context -> {
                    Object source = context.getSource();
                    return userService.findAllUsers(ObjectCasting.objectToList(source, Long.class));
                })
                .map(PostList::getAuthorIds, UserDtoList::setList));

        modelMapper.typeMap(CreatePostDto.class, Post.class)
            .addMappings(mapper -> {
                mapper.using(new TitleToSlugConverter(postService))
                    .map(CreatePostDto::getTitle, Post::setSlug);

                mapper.using(new BodyToExcerptConverter())
                    .map(CreatePostDto::getBody, Post::setExcerpt);
            });

        modelMapper.typeMap(UpdatePostDto.class, Post.class)
            .addMappings(mapper -> {
                mapper.using(new TitleToSlugConverter(postService))
                    .map(UpdatePostDto::getTitle, Post::setSlug);

                mapper.using(new BodyToExcerptConverter())
                    .map(UpdatePostDto::getBody, Post::setExcerpt);
            });
    }
}

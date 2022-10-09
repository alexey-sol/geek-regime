package com.github.alexeysol.geekregimeapiaggregator.features.posts.utils.mappers;

import com.github.alexeysol.geekregimeapiaggregator.features.posts.services.v1.PostService;
import com.github.alexeysol.geekregimeapiaggregator.features.posts.utils.mappers.converters.RawPostDtoListToPostDtoListConverter;
import com.github.alexeysol.geekregimeapiaggregator.features.users.services.v1.UserService;
import com.github.alexeysol.geekregimeapicommons.models.dtos.PostDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.RawPostDto;
import org.modelmapper.ModelMapper;

import java.util.List;

public abstract class BasePostMapper {
    protected final ModelMapper modelMapper;
    protected final PostService postService;
    protected final UserService userService;

    static protected class RawPostDtoList {
        private List<RawPostDto> list;

        public List<RawPostDto> getList() {
            return list;
        }

        public void setList(List<RawPostDto> list) {
            this.list = list;
        }
    }

    static protected class PostDtoList {
        private List<PostDto> list;

        public List<PostDto> getList() {
            return list;
        }

        public void setList(List<PostDto> list) {
            this.list = list;
        }
    }

    public BasePostMapper(
        ModelMapper modelMapper,
        PostService postService,
        UserService userService
    ) {
        this.modelMapper = modelMapper;
        this.postService = postService;
        this.userService = userService;
        init(modelMapper);
    }

    private void init(ModelMapper modelMapper) {
        modelMapper.createTypeMap(RawPostDto.class, PostDto.class)
            .addMappings(mapper -> mapper
                .using(context -> userService.findUserById((long) context.getSource()))
                .map(RawPostDto::getAuthorId, PostDto::setAuthor));

        modelMapper.createTypeMap(RawPostDtoList.class, PostDtoList.class)
            .addMappings(mapper -> mapper
                .using(new RawPostDtoListToPostDtoListConverter(userService, modelMapper))
                .map(RawPostDtoList::getList, PostDtoList::setList));
    }
}

package com.github.alexeysol.geekregimeapiaggregator.features.posts.utils.mappers;

import com.github.alexeysol.geekregimeapiaggregator.features.posts.services.v1.PostService;
import com.github.alexeysol.geekregimeapiaggregator.features.users.services.v1.UserService;
import com.github.alexeysol.geekregimeapicommons.models.dtos.PostDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.RawPostDto;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PostMapper extends BasePostMapper {
    public PostMapper(ModelMapper modelMapper, PostService postService, UserService userService) {
        super(modelMapper, postService, userService);
    }

    public PostDto fromRawPostDtoToPostDto(RawPostDto rawPostDto) {
        return modelMapper.map(rawPostDto, PostDto.class);
    }

    public List<PostDto> fromRawPostDtoListToPostDtoList(List<RawPostDto> rawPostDtoList) {
        RawPostDtoList dtoList = new RawPostDtoList();
        dtoList.setList(rawPostDtoList);
        return modelMapper.map(dtoList, PostDtoList.class).getList();
    }
}

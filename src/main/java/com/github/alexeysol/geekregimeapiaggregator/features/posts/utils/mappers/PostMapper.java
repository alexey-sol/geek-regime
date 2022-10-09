package com.github.alexeysol.geekregimeapiaggregator.features.posts.utils.mappers;

import com.github.alexeysol.geekregimeapiaggregator.features.posts.services.v1.PostService;
import com.github.alexeysol.geekregimeapiaggregator.features.users.services.v1.UserService;
import com.github.alexeysol.geekregimeapicommons.models.dtos.PostDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.RawPostDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.UserDto;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class PostMapper extends BasePostMapper {
    public PostMapper(ModelMapper modelMapper, PostService postService, UserService userService) {
        super(modelMapper, postService, userService);
    }

    public List<PostDto> fromRawPostDtoListToPostDtoList(List<RawPostDto> rawPostDtoList) {
        Map<Long, UserDto> mapAuthorIdToAuthor = getMapAuthorIdToAuthor(rawPostDtoList);

        return rawPostDtoList.stream()
            .map(dto -> {
                UserDto author = mapAuthorIdToAuthor.get(dto.getAuthorId());
                return fromRawPostDtoToPostDtoWithProvidedAuthor(dto, author);
            })
            .toList();
    }

    public PostDto fromRawPostDtoToPostDtoWithProvidedAuthor(RawPostDto rawPostDto, UserDto author) {
        PostDto partialDto = modelMapper.map(rawPostDto, PartialPostDto.class);
        partialDto.setAuthor(author);
        return partialDto;
    }

    private Map<Long, UserDto> getMapAuthorIdToAuthor(List<RawPostDto> rawPostDtoList) {
        return fromRawPostDtoListToUserDtoList(rawPostDtoList).stream()
            .collect(Collectors.toMap(UserDto::getId, Function.identity()));
    }

    private List<UserDto> fromRawPostDtoListToUserDtoList(List<RawPostDto> rawPostDtoList) {
        RawPostDtoList dtoList = new RawPostDtoList();
        dtoList.setList(rawPostDtoList);
        return modelMapper.map(dtoList, UserDtoList.class).getList();
    }
}

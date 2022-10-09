package com.github.alexeysol.geekregimeapiaggregator.features.posts.utils.mappers.converters;

import com.github.alexeysol.geekregimeapiaggregator.features.users.services.v1.UserService;
import com.github.alexeysol.geekregimeapicommons.models.dtos.PostDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.RawPostDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.UserDto;
import org.modelmapper.AbstractConverter;
import org.modelmapper.ModelMapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RawPostDtoListToPostDtoListConverter extends AbstractConverter<
    List<RawPostDto>,
    List<PostDto>
> {
    private final UserService userService;
    private final ModelMapper modelMapper;

    public RawPostDtoListToPostDtoListConverter(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    // Using TransientPostDto is a trick to avoid RawPostDto -> PostDto mapping when it's
    // cumbersome: when looping through posts list, say, otherwise it would fetch a user for
    // each post separately.
    static protected class TransientPostDto extends PostDto {}

    @Override
    protected List<PostDto> convert(List<RawPostDto> rawPostDtoList) {
        List<Long> authorIds = getAuthorIds(rawPostDtoList);
        Map<Long, UserDto> mapAuthorIdToAuthor = getMapAuthorIdToAuthor(authorIds);

        return rawPostDtoList.stream()
            .map(rawPostDto -> {
                UserDto author = mapAuthorIdToAuthor.get(rawPostDto.getAuthorId());
                return fromRawPostDtoToPostDtoWithProvidedAuthor(rawPostDto, author);
            })
            .toList();
    }

    private List<Long> getAuthorIds(List<RawPostDto> list) {
        return list.stream()
            .map(RawPostDto::getAuthorId)
            .distinct()
            .toList();
    }

    private Map<Long, UserDto> getMapAuthorIdToAuthor(List<Long> authorIds) {
        Map<Long, UserDto> map = new HashMap<>();

        if (authorIds.isEmpty()) {
            return map;
        }

        List<UserDto> authors = userService.findAllUsers(authorIds);
        authors.forEach(author -> map.put(author.getId(), author));
        return map;
    }

    private PostDto fromRawPostDtoToPostDtoWithProvidedAuthor(
        RawPostDto rawPostDto,
        UserDto author
    ) {
        TransientPostDto transientPostDto = modelMapper.map(rawPostDto, TransientPostDto.class);
        transientPostDto.setAuthor(author);
        return modelMapper.map(transientPostDto, PostDto.class);
    }
}

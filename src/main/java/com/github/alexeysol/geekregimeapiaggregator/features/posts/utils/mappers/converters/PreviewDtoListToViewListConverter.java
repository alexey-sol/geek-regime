package com.github.alexeysol.geekregimeapiaggregator.features.posts.utils.mappers.converters;

import com.github.alexeysol.geekregimeapiaggregator.features.users.services.v1.UserService;
import com.github.alexeysol.geekregimeapicommons.models.dtos.PostPreviewDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.PostPreviewView;
import com.github.alexeysol.geekregimeapicommons.models.dtos.UserDto;
import org.modelmapper.AbstractConverter;
import org.modelmapper.ModelMapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Fetches a collection of users from the corresponding API via single query and sets them to
// DTOs as author field.
public class PreviewDtoListToViewListConverter extends AbstractConverter<
    List<PostPreviewDto>,
    List<PostPreviewView>
> {
    private final UserService userService;
    private final ModelMapper modelMapper;

    public PreviewDtoListToViewListConverter(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected List<PostPreviewView> convert(List<PostPreviewDto> dtoList) {
        List<Long> authorIds = getAuthorIds(dtoList);
        Map<Long, UserDto> mapAuthorIdToAuthor = getMapAuthorIdToAuthor(authorIds);

        return dtoList.stream()
            .map(dto -> {
                UserDto author = mapAuthorIdToAuthor.get(dto.getAuthorId());
                return fromDtoToViewWithProvidedAuthor(dto, author);
            })
            .toList();
    }

    private List<Long> getAuthorIds(List<PostPreviewDto> dtoList) {
        return dtoList.stream()
            .map(PostPreviewDto::getAuthorId)
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

    private PostPreviewView fromDtoToViewWithProvidedAuthor(
        PostPreviewDto dto,
        UserDto author
    ) {
        PostPreviewView view = modelMapper.map(dto, PostPreviewView.class);
        view.setAuthor(author);
        return modelMapper.map(view, PostPreviewView.class);
    }
}

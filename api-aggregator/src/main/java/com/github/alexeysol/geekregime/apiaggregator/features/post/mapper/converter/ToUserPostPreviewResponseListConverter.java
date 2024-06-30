package com.github.alexeysol.geekregime.apiaggregator.features.post.mapper.converter;

import com.github.alexeysol.geekregime.apiaggregator.features.user.service.v1.UserService;
import com.github.alexeysol.geekregime.apicommons.generated.model.PostPreviewResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.UserPostPreviewResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.UserResponse;
import org.modelmapper.AbstractConverter;
import org.modelmapper.ModelMapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Fetches a collection of users from the corresponding API via single query and sets them to
// DTOs as author field.
public class ToUserPostPreviewResponseListConverter extends AbstractConverter<
    List<PostPreviewResponse>,
    List<UserPostPreviewResponse>
> {
    private final UserService userService;
    private final ModelMapper modelMapper;

    public ToUserPostPreviewResponseListConverter(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected List<UserPostPreviewResponse> convert(List<PostPreviewResponse> sources) {
        List<Long> authorIds = getAuthorIds(sources);
        Map<Long, UserResponse> mapAuthorIdToAuthor = getMapAuthorIdToAuthor(authorIds);

        return sources.stream()
            .map(source -> {
                UserResponse author = mapAuthorIdToAuthor.get(source.getAuthorId());
                return toUserPostPreviewResponse(source, author);
            })
            .toList();
    }

    private List<Long> getAuthorIds(List<PostPreviewResponse> sources) {
        return sources.stream()
            .map(PostPreviewResponse::getAuthorId)
            .distinct()
            .toList();
    }

    private Map<Long, UserResponse> getMapAuthorIdToAuthor(List<Long> authorIds) {
        Map<Long, UserResponse> map = new HashMap<>();

        if (authorIds.isEmpty()) {
            return map;
        }

        List<UserResponse> authors = userService.findAllUsers(authorIds);
        authors.forEach(author -> map.put(author.getId(), author));
        return map;
    }

    private UserPostPreviewResponse toUserPostPreviewResponse(PostPreviewResponse source, UserResponse author) {
        UserPostPreviewResponse target = modelMapper.map(source, UserPostPreviewResponse.class);
        target.setAuthor(author);
        return modelMapper.map(target, UserPostPreviewResponse.class);
    }
}

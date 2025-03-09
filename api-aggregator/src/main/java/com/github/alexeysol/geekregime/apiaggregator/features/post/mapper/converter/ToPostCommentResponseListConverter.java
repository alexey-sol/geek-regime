package com.github.alexeysol.geekregime.apiaggregator.features.post.mapper.converter;

import com.github.alexeysol.geekregime.apiaggregator.features.user.service.v1.UserService;
import com.github.alexeysol.geekregime.apicommons.generated.model.*;
import org.modelmapper.AbstractConverter;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.Map;

// Fetches a collection of users from the corresponding API via single query and sets them to
// DTOs as author field.
public class ToPostCommentResponseListConverter extends AbstractConverter<
    List<BasePostCommentResponse>,
    List<PostCommentResponse>
> {
    static private class BasePostCommentResponseWrapper extends BasePostCommentResponse {}

    private final UserService userService;
    private final ModelMapper modelMapper;

    public ToPostCommentResponseListConverter(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected List<PostCommentResponse> convert(List<BasePostCommentResponse> sources) {
        List<Long> authorIds = getAuthorIds(sources);
        Map<Long, UserResponse> mapAuthorIdToAuthor = userService.getMapAuthorIdToAuthor(authorIds);

        return sources.stream()
            .map(source -> {
                UserResponse author = mapAuthorIdToAuthor.get(source.getAuthorId());
                return toPostCommentResponse(source, author);
            })
            .toList();
    }

    private List<Long> getAuthorIds(List<BasePostCommentResponse> sources) {
        return sources.stream()
            .map(BasePostCommentResponse::getAuthorId)
            .distinct()
            .toList();
    }

    private PostCommentResponse toPostCommentResponse(BasePostCommentResponse source, UserResponse author) {
        var wrappedSource = modelMapper.map(source, BasePostCommentResponseWrapper.class); // [1]
        var target = modelMapper.map(wrappedSource, PostCommentResponse.class);
        target.setAuthor(author);
        return modelMapper.map(target, PostCommentResponse.class);
    }
}

// [1]. We can't use BasePostCommentResponse directly here because it's going to trigger
// implicit BasePostCommentResponse to PostCommentResponse mapping (which has a side effect,
// unwanted in this case).

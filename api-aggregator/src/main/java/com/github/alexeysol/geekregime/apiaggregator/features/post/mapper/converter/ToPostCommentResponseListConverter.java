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
                return toPostPreviewResponse(source, author);
            })
            .toList();
    }

    private List<Long> getAuthorIds(List<BasePostCommentResponse> sources) {
        return sources.stream()
            .map(BasePostCommentResponse::getAuthorId)
            .distinct()
            .toList();
    }

    private PostCommentResponse toPostPreviewResponse(BasePostCommentResponse source, UserResponse author) {
        PostCommentResponse target = modelMapper.map(source, PostCommentResponse.class);
        target.setAuthor(author);
        return modelMapper.map(target, PostCommentResponse.class);
    }
}

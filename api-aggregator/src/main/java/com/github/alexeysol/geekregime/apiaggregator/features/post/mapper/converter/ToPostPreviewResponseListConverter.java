package com.github.alexeysol.geekregime.apiaggregator.features.post.mapper.converter;

import com.github.alexeysol.geekregime.apiaggregator.features.user.service.v1.UserService;
import com.github.alexeysol.geekregime.apicommons.generated.model.BasePostPreviewResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.PostPreviewResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.UserResponse;
import org.modelmapper.AbstractConverter;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.Map;

// TODO refactor this and ToPostCommentResponseListConverter
// Fetches a collection of users from the corresponding API via single query and sets them to
// DTOs as author field.
public class ToPostPreviewResponseListConverter extends AbstractConverter<
    List<BasePostPreviewResponse>,
    List<PostPreviewResponse>
> {
    static private class BasePostPreviewResponseWrapper extends BasePostPreviewResponse {}

    private final UserService userService;
    private final ModelMapper modelMapper;

    public ToPostPreviewResponseListConverter(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected List<PostPreviewResponse> convert(List<BasePostPreviewResponse> sources) {
        List<Long> authorIds = getAuthorIds(sources);
        Map<Long, UserResponse> mapAuthorIdToAuthor = userService.getMapAuthorIdToAuthor(authorIds);

        return sources.stream()
            .map(source -> {
                UserResponse author = mapAuthorIdToAuthor.get(source.getAuthorId());
                return toPostPreviewResponse(source, author);
            })
            .toList();
    }

    private List<Long> getAuthorIds(List<BasePostPreviewResponse> sources) {
        return sources.stream()
            .map(BasePostPreviewResponse::getAuthorId)
            .distinct()
            .toList();
    }

    private PostPreviewResponse toPostPreviewResponse(BasePostPreviewResponse source, UserResponse author) {
        var wrappedSource = modelMapper.map(source, BasePostPreviewResponseWrapper.class);
        PostPreviewResponse target = modelMapper.map(wrappedSource, PostPreviewResponse.class);
        target.setAuthor(author);
        return modelMapper.map(target, PostPreviewResponse.class);
    }
}

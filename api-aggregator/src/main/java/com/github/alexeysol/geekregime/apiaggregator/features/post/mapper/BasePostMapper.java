package com.github.alexeysol.geekregime.apiaggregator.features.post.mapper;

import com.github.alexeysol.geekregime.apiaggregator.features.post.mapper.converter.ToPostPreviewResponseListConverter;
import com.github.alexeysol.geekregime.apiaggregator.features.user.service.v1.UserService;
import com.github.alexeysol.geekregime.apicommons.generated.model.BasePostDetailsResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.BasePostPreviewResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.PostDetailsResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.PostPreviewResponse;
import lombok.Data;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;

import java.util.List;

// TODO any way to combine this one and BasePostCommentMapper?
public abstract class BasePostMapper {
    protected final ModelMapper modelMapper;
    protected final UserService userService;

    @Data
    static protected class BasePostPreviewResponseList {
        private List<BasePostPreviewResponse> list;
    }

    @Data
    static protected class PostPreviewResponseList {
        private List<PostPreviewResponse> list;
    }

    public BasePostMapper(ModelMapper modelMapper, UserService userService) {
        this.modelMapper = modelMapper;
        this.userService = userService;
        init(modelMapper);
    }

    private void init(ModelMapper modelMapper) {
        modelMapper.createTypeMap(BasePostDetailsResponse.class, PostDetailsResponse.class)
            .addMappings(mapper -> mapper
                .using(context -> {
                    var userId = (long) context.getSource();
                    return userService.findUserById(userId, List.of(HttpStatus.NOT_FOUND));
                })
                .map(BasePostDetailsResponse::getAuthorId, PostDetailsResponse::setAuthor));

        modelMapper.createTypeMap(BasePostPreviewResponseList.class, PostPreviewResponseList.class)
            .addMappings(mapper -> mapper
                .using(new ToPostPreviewResponseListConverter(userService, modelMapper))
                .map(BasePostPreviewResponseList::getList, PostPreviewResponseList::setList));
    }
}

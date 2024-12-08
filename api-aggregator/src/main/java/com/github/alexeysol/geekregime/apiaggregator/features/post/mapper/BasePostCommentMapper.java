package com.github.alexeysol.geekregime.apiaggregator.features.post.mapper;

import com.github.alexeysol.geekregime.apiaggregator.features.post.mapper.converter.ToPostCommentResponseListConverter;
import com.github.alexeysol.geekregime.apiaggregator.features.user.service.v1.UserService;
import com.github.alexeysol.geekregime.apicommons.generated.model.*;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.util.List;

public abstract class BasePostCommentMapper {
    protected final ModelMapper modelMapper;
    protected final UserService userService;

    @Data
    static protected class BasePostCommentResponseList {
        private List<BasePostCommentResponse> list;
    }

    @Data
    static protected class PostCommentResponseList {
        private List<PostCommentResponse> list;
    }

    public BasePostCommentMapper(
        ModelMapper modelMapper,
        UserService userService
    ) {
        this.modelMapper = modelMapper;
        this.userService = userService;
        init(modelMapper);
    }

    private void init(ModelMapper modelMapper) {
        modelMapper.createTypeMap(BasePostCommentResponse.class, PostCommentResponse.class)
            .addMappings(mapper -> mapper
                .using(context -> userService.findUserById((long) context.getSource()))
                .map(BasePostCommentResponse::getAuthorId, PostCommentResponse::setAuthor));

        modelMapper.createTypeMap(BasePostCommentResponseList.class, PostCommentResponseList.class)
            .addMappings(mapper -> mapper
                .using(new ToPostCommentResponseListConverter(userService, modelMapper))
                .map(BasePostCommentResponseList::getList, PostCommentResponseList::setList));

        modelMapper.createTypeMap(BasePostCommentTreeResponse.class, PostCommentTreeResponse.class)
            .addMappings(mapper -> mapper
                .using(context -> userService.findUserById((long) context.getSource()))
                .map(BasePostCommentTreeResponse::getAuthorId, PostCommentTreeResponse::setAuthor));
    }
}

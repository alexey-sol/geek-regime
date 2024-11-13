package com.github.alexeysol.geekregime.apiposts.mapper;

import com.github.alexeysol.geekregime.apicommons.generated.model.*;
import com.github.alexeysol.geekregime.apiposts.mapper.converters.PostIdToPostConverter;
import com.github.alexeysol.geekregime.apiposts.model.entity.PostComment;
import com.github.alexeysol.geekregime.apiposts.service.v1.PostService;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;

public abstract class BasePostCommentMapper {
    protected final ModelMapper modelMapper;
    protected final PostService postService;

    public BasePostCommentMapper(ModelMapper modelMapper, PostService postService) {
        this.modelMapper = modelMapper;
        this.postService = postService;
        init(modelMapper);
    }

    private void init(ModelMapper modelMapper) {
        modelMapper.createTypeMap(PostComment.class, BasePostCommentResponse.class)
            .addMappings(mapper -> mapper
                .using(MappingContext::getSource)
                .map(PostComment::getUserId, BasePostCommentResponse::setAuthorId));

        modelMapper.typeMap(CreatePostCommentRequest.class, PostComment.class)
            .addMappings(mapper -> {
                mapper
                    .using(MappingContext::getSource)
                    .map(CreatePostCommentRequest::getAuthorId, PostComment::setUserId);

                mapper.using(new PostIdToPostConverter(postService))
                    .map(CreatePostCommentRequest::getPostId, PostComment::setPost);
            });
    }
}

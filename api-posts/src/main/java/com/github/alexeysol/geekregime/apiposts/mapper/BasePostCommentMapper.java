package com.github.alexeysol.geekregime.apiposts.mapper;

import com.github.alexeysol.geekregime.apicommons.generated.model.BasePostCommentResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.BasePostCommentTreeResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.CreatePostCommentRequest;
import com.github.alexeysol.geekregime.apiposts.mapper.converters.ParentIdToParentConverter;
import com.github.alexeysol.geekregime.apiposts.mapper.converters.PostIdToPostConverter;
import com.github.alexeysol.geekregime.apiposts.model.entity.PostComment;
import com.github.alexeysol.geekregime.apiposts.service.v1.PostCommentService;
import com.github.alexeysol.geekregime.apiposts.service.v1.PostService;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;

public abstract class BasePostCommentMapper {
    private final static Converter<PostComment, String> bodyConverter = ctx -> ctx.getSource().getIsDeleted()
        ? null
        : ctx.getSource().getBody();

    protected final ModelMapper modelMapper;
    protected final PostService postService;
    protected final PostCommentService postCommentService;

    public BasePostCommentMapper(ModelMapper modelMapper, PostService postService, PostCommentService postCommentService) {
        this.modelMapper = modelMapper;
        this.postService = postService;
        this.postCommentService = postCommentService;
        init(modelMapper);
    }

    private void init(ModelMapper modelMapper) {
        modelMapper.createTypeMap(PostComment.class, BasePostCommentResponse.class)
            .addMappings(mapper -> {
                mapper.using(MappingContext::getSource)
                    .map(PostComment::getUserId, BasePostCommentResponse::setAuthorId);

                mapper.using(bodyConverter).map(src -> src, BasePostCommentResponse::setBody);
            });

        modelMapper.typeMap(CreatePostCommentRequest.class, PostComment.class)
            .addMappings(mapper -> {
                mapper.using(MappingContext::getSource)
                    .map(CreatePostCommentRequest::getAuthorId, PostComment::setUserId);

                mapper.using(new PostIdToPostConverter(postService))
                    .map(CreatePostCommentRequest::getPostId, PostComment::setPost);

                mapper.using(new ParentIdToParentConverter(postCommentService))
                    .map(CreatePostCommentRequest::getParentId, PostComment::setParent);
            });

        modelMapper.createTypeMap(PostComment.class, BasePostCommentTreeResponse.class)
            .addMappings(mapper -> {
                mapper.using(MappingContext::getSource)
                    .map(PostComment::getUserId, BasePostCommentTreeResponse::setAuthorId);

                mapper.using(bodyConverter).map(src -> src, BasePostCommentTreeResponse::setBody);
            });
    }
}

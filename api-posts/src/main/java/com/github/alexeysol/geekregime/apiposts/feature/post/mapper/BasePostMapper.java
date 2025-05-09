package com.github.alexeysol.geekregime.apiposts.feature.post.mapper;

import com.github.alexeysol.geekregime.apicommons.generated.model.*;
import com.github.alexeysol.geekregime.apiposts.feature.post.mapper.converter.BodyToExcerptConverter;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.feature.post.service.v1.PostService;
import com.github.alexeysol.geekregime.apiposts.shared.mapper.converter.TitleToSlugConverter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;

import java.util.Objects;

public abstract class BasePostMapper {
    protected final ModelMapper modelMapper;
    protected final PostService service;

    public BasePostMapper(ModelMapper modelMapper, PostService service) {
        this.modelMapper = modelMapper;
        this.service = service;
        init(modelMapper);
    }

    private void init(ModelMapper modelMapper) {
        modelMapper.createTypeMap(Post.class, BasePostDetailsResponse.class)
            .addMappings(mapper -> mapper
                .using(MappingContext::getSource)
                .map(Post::getUserId, BasePostDetailsResponse::setAuthorId));

        modelMapper.createTypeMap(Post.class, BasePostPreviewResponse.class)
            .addMappings(mapper -> mapper
                .using(MappingContext::getSource)
                .map(Post::getUserId, BasePostPreviewResponse::setAuthorId));

        modelMapper.typeMap(CreatePostRequest.class, Post.class)
            .addMappings(mapper -> {
                mapper.using(new TitleToSlugConverter(service))
                    .map(CreatePostRequest::getTitle, Post::setSlug);

                mapper.using(new BodyToExcerptConverter())
                    .map(CreatePostRequest::getBody, Post::setExcerpt);

                mapper.using(MappingContext::getSource)
                    .map(CreatePostRequest::getAuthorId, Post::setUserId);
            });

        modelMapper.typeMap(UpdatePostRequest.class, Post.class)
            .addMappings(mapper -> {
                mapper.when(this::shouldUpdateSlug)
                    .using(new TitleToSlugConverter(service))
                    .map(UpdatePostRequest::getTitle, Post::setSlug);

                mapper.using(new BodyToExcerptConverter())
                    .map(UpdatePostRequest::getBody, Post::setExcerpt);
            });
    }

    private boolean shouldUpdateSlug(MappingContext<Object, Object> context) {
        String title = (String) context.getSource();
        Post post = (Post) context.getParent().getDestination();

        boolean hasRequiredValues = Objects.nonNull(title) && Objects.nonNull(post);
        return hasRequiredValues && !title.equals(post.getTitle());
    }
}

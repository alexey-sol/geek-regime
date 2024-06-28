package com.github.alexeysol.geekregime.apiposts.mapper;

import com.github.alexeysol.geekregime.apicommons.generated.model.PostDetailsResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.PostPreviewResponse;
import com.github.alexeysol.geekregime.apiposts.generated.model.CreatePostRequest;
import com.github.alexeysol.geekregime.apiposts.generated.model.UpdatePostRequest;
import com.github.alexeysol.geekregime.apiposts.mapper.converters.BodyToExcerptConverter;
import com.github.alexeysol.geekregime.apiposts.mapper.converters.TitleToSlugConverter;
import com.github.alexeysol.geekregime.apiposts.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.service.v1.PostService;
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
        modelMapper.createTypeMap(Post.class, PostDetailsResponse.class)
            .addMappings(mapper -> mapper
                .using(MappingContext::getSource)
                .map(Post::getUserId, PostDetailsResponse::setAuthorId));

        modelMapper.createTypeMap(Post.class, PostPreviewResponse.class)
            .addMappings(mapper -> mapper
                .using(MappingContext::getSource)
                .map(Post::getUserId, PostPreviewResponse::setAuthorId));

        modelMapper.typeMap(CreatePostRequest.class, Post.class)
            .addMappings(mapper -> {
                mapper.using(new TitleToSlugConverter(service))
                    .map(CreatePostRequest::getTitle, Post::setSlug);

                mapper.using(new BodyToExcerptConverter())
                    .map(CreatePostRequest::getBody, Post::setExcerpt);

                mapper
                    .using(MappingContext::getSource)
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

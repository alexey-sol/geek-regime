package com.github.alexeysol.geekregimeapiposts.utils.mappers;

import com.github.alexeysol.geekregimeapicommons.models.dtos.posts.PostDetailsDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.posts.PostPreviewDto;
import com.github.alexeysol.geekregimeapiposts.models.dtos.*;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.services.v1.PostService;
import com.github.alexeysol.geekregimeapiposts.utils.mappers.converters.BodyToExcerptConverter;
import com.github.alexeysol.geekregimeapiposts.utils.mappers.converters.TitleToSlugConverter;
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
        modelMapper.createTypeMap(Post.class, PostDetailsDto.class)
            .addMappings(mapper -> mapper
                .using(MappingContext::getSource)
                .map(Post::getUserId, PostDetailsDto::setAuthorId));

        modelMapper.createTypeMap(Post.class, PostPreviewDto.class)
            .addMappings(mapper -> mapper
                .using(MappingContext::getSource)
                .map(Post::getUserId, PostPreviewDto::setAuthorId));

        modelMapper.typeMap(CreatePostDto.class, Post.class)
            .addMappings(mapper -> {
                mapper.using(new TitleToSlugConverter(service))
                    .map(CreatePostDto::getTitle, Post::setSlug);

                mapper.using(new BodyToExcerptConverter())
                    .map(CreatePostDto::getBody, Post::setExcerpt);

                mapper
                    .using(MappingContext::getSource)
                    .map(CreatePostDto::getAuthorId, Post::setUserId);
            });

        modelMapper.typeMap(UpdatePostDto.class, Post.class)
            .addMappings(mapper -> {
                mapper.when(this::shouldUpdateSlug)
                    .using(new TitleToSlugConverter(service))
                    .map(UpdatePostDto::getTitle, Post::setSlug);

                mapper.using(new BodyToExcerptConverter())
                    .map(UpdatePostDto::getBody, Post::setExcerpt);
            });
    }

    private boolean shouldUpdateSlug(MappingContext<Object, Object> context) {
        String title = (String) context.getSource();
        Post post = (Post) context.getParent().getDestination();

        boolean hasRequiredValues = Objects.nonNull(title) && Objects.nonNull(post);
        return hasRequiredValues && !title.equals(post.getTitle());
    }
}

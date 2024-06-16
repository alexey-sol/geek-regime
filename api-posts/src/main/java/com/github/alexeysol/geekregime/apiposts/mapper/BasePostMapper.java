package com.github.alexeysol.geekregime.apiposts.mapper;

import com.github.alexeysol.geekregime.apicommons.model.dto.post.PostDetailsDto;
import com.github.alexeysol.geekregime.apicommons.model.dto.post.PostPreviewDto;
import com.github.alexeysol.geekregime.apiposts.mapper.converters.BodyToExcerptConverter;
import com.github.alexeysol.geekregime.apiposts.mapper.converters.TitleToSlugConverter;
import com.github.alexeysol.geekregime.apiposts.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.service.v1.PostService;
import com.github.alexeysol.geekregime.apiposts.model.dto.CreatePostDto;
import com.github.alexeysol.geekregime.apiposts.model.dto.UpdatePostDto;
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

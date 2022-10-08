package com.github.alexeysol.geekregimeapiposts.utils.mappers;

import com.github.alexeysol.geekregimeapicommons.models.dtos.RawPostDto;
import com.github.alexeysol.geekregimeapiposts.models.dtos.*;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.services.v1.PostService;
import com.github.alexeysol.geekregimeapiposts.utils.mappers.converters.BodyToExcerptConverter;
import com.github.alexeysol.geekregimeapiposts.utils.mappers.converters.TitleToSlugConverter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;

public abstract class BasePostMapper {
    protected final ModelMapper modelMapper;
    protected final PostService postService;

    public BasePostMapper(ModelMapper modelMapper, PostService postService) {
        this.modelMapper = modelMapper;
        this.postService = postService;
        init(modelMapper);
    }

    private void init(ModelMapper modelMapper) {
        modelMapper.createTypeMap(Post.class, RawPostDto.class)
            .addMappings(mapper -> mapper
                .using(MappingContext::getSource)
                .map(Post::getUserId, RawPostDto::setAuthorId));

        modelMapper.typeMap(CreatePostDto.class, Post.class)
            .addMappings(mapper -> {
                mapper.using(new TitleToSlugConverter(postService))
                    .map(CreatePostDto::getTitle, Post::setSlug);

                mapper.using(new BodyToExcerptConverter())
                    .map(CreatePostDto::getBody, Post::setExcerpt);
            });

        modelMapper.typeMap(UpdatePostDto.class, Post.class)
            .addMappings(mapper -> {
                mapper.using(new TitleToSlugConverter(postService))
                    .map(UpdatePostDto::getTitle, Post::setSlug);

                mapper.using(new BodyToExcerptConverter())
                    .map(UpdatePostDto::getBody, Post::setExcerpt);
            });
    }
}

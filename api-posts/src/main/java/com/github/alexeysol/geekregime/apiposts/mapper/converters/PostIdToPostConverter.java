package com.github.alexeysol.geekregime.apiposts.mapper.converters;

import com.github.alexeysol.geekregime.apiposts.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.service.v1.PostService;
import org.modelmapper.AbstractConverter;

public class PostIdToPostConverter extends AbstractConverter<Long, Post> {
    private final PostService service;

    public PostIdToPostConverter(PostService service) {
        this.service = service;
    }

    @Override
    protected Post convert(Long postId) {
        var optionalPost = service.findPostById(postId);

        return optionalPost.orElse(null);
    }
}

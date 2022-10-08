package com.github.alexeysol.geekregimeapiposts.testutils;

import com.github.alexeysol.geekregimeapicommons.models.dtos.RawPostDto;
import com.github.alexeysol.geekregimeapiposts.models.dtos.CreatePostDto;
import com.github.alexeysol.geekregimeapiposts.models.dtos.UpdatePostDto;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;

public class Factories {
    public static Post createPost() {
        return createPost(0L, 0L, null, null, null, null);
    }

    public static Post createPost(long userId, long spaceId, String title, String body) {
        return createPost(userId, spaceId, title, body, null, null);
    }

    public static Post createPost(String title, String body) {
        return createPost(0L, 0L, title, body, null, null);
    }

    public static Post createPost(String title, String body, String excerpt, String slug) {
        return createPost(0L, 0L, title, body, excerpt, slug);
    }

    public static Post createPost(String title, String body, String slug) {
        return createPost(0L, 0L, title, body, null, slug);
    }

    public static Post createPost(
        long userId,
        long spaceId,
        String title,
        String body,
        String excerpt,
        String slug
    ) {
        Post post = new Post();
        post.setUserId(userId);
        post.setSpaceId(spaceId);
        post.setTitle(title);
        post.setBody(body);
        post.setExcerpt(excerpt);
        post.setSlug(slug);
        return post;
    }

    public static RawPostDto createRawPostDto() {
        return createRawPostDto(null, null);
    }

    public static RawPostDto createRawPostDto(String title, String body) {
        RawPostDto post = new RawPostDto();
        post.setTitle(title);
        post.setBody(body);
        return post;
    }

    public static CreatePostDto createCreatePostDto(
        long userId,
        long spaceId,
        String title,
        String body
    ) {
        CreatePostDto dto = new CreatePostDto();
        dto.setUserId(userId);
        dto.setSpaceId(spaceId);
        dto.setTitle(title);
        dto.setBody(body);
        return dto;
    }

    public static UpdatePostDto createUpdatePostDto(String title, String body) {
        UpdatePostDto dto = new UpdatePostDto();
        dto.setTitle(title);
        dto.setBody(body);
        return dto;
    }
}

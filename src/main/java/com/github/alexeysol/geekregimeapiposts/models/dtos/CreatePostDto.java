package com.github.alexeysol.geekregimeapiposts.models.dtos;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

public class CreatePostDto {
    @NotNull(message = "User ID is required")
    private long userId;

    @NotNull(message = "Space ID is required")
    private long spaceId;

    @NotEmpty(message = "Title is required and must not be blank")
    private String title;

    @NotEmpty(message = "Body is required and must not be blank")
    private String body;

    @Null(message = "Slug must be absent")
    private String slug;

    public long getUserId() {
        return userId;
    }

    public long getSpaceId() {
        return spaceId;
    }

    public String getTitle() {
        return title;
    }

    public String getBody() {
        return body;
    }

    public String getSlug() {
        return slug;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public void setSpaceId(long spaceId) {
        this.spaceId = spaceId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }
}

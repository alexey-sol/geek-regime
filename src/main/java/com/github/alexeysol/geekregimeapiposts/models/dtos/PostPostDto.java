package com.github.alexeysol.geekregimeapiposts.models.dtos;

import com.github.alexeysol.geekregimeapiposts.utils.Slug;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;

public class PostPostDto {
    @NotNull(message = "User ID must be present")
    private long userId;

    @NotNull(message = "Space ID must be present")
    private long spaceId;

    @NotNull(message = "Title must be present")
    @Size(min = 1, message = "Title must not be blank")
    private String title;

    @NotNull(message = "Body must be present")
    @Size(min = 1, message = "Body must not be blank")
    private String body;

    @Null(message = "Slug must not be present")
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

    public void generateAndSetSlug() {
        setSlug(Slug.generateSlug(title));
    }

    public void attachSuffixToSlug() {
        String suffix = Slug.getSuffixFromHash(this);
        setSlug(slug + suffix);
    }
}

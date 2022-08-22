package com.github.alexeysol.geekregimeapiposts.models.dtos;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

@Data
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
}

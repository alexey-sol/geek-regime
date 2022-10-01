package com.github.alexeysol.geekregimeapiposts.models.dtos;

import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Null;

@Data
public class CreatePostDto {
    @Min(value = 1, message = "User ID is required and must be greater than 0")
    private long userId;

    @Min(value = 1, message = "Space ID is required and must be greater than 0")
    private long spaceId;

    @NotEmpty(message = "Title is required and must not be blank")
    private String title;

    @NotEmpty(message = "Body is required and must not be blank")
    private String body;

    @Null(message = "Slug must be absent")
    private String slug;
}

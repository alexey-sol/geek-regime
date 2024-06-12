package com.github.alexeysol.geekregime.apiposts.model.dtos;

import lombok.Builder;
import lombok.Data;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

@Data
@Builder
public class CreatePostDto {
    @Min(value = 1, message = "Author ID is required and must be greater than 0")
    private long authorId;

    @Min(value = 1, message = "Space ID is required and must be greater than 0")
    private long spaceId;

    @NotEmpty(message = "Title is required and must not be blank")
    private String title;

    @NotEmpty(message = "Body is required and must not be blank")
    private String body;
}

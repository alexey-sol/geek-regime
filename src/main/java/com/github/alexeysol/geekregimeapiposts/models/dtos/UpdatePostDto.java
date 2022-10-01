package com.github.alexeysol.geekregimeapiposts.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
public class UpdatePostDto {
    @Size(min = 1, message = "Title must not be blank")
    private String title;

    @Size(min = 1, message = "Raw body must not be blank")
    private String rawBody;

    @Size(min = 1, message = "Display body must not be blank")
    private String displayBody;
}

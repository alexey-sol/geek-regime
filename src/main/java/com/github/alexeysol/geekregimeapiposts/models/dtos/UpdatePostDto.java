package com.github.alexeysol.geekregimeapiposts.models.dtos;

import lombok.Data;
import javax.validation.constraints.Size;

@Data
public class UpdatePostDto {
    @Size(min = 1, message = "Title must not be blank")
    private String title;

    @Size(min = 1, message = "Body must not be blank")
    private String body;
}

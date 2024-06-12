package com.github.alexeysol.geekregime.apiposts.model.dtos;

import lombok.Builder;
import lombok.Data;
import javax.validation.constraints.Size;

@Data
@Builder
public class UpdatePostDto {
    @Size(min = 1, message = "Title must not be blank")
    private String title;

    @Size(min = 1, message = "Body must not be blank")
    private String body;
}

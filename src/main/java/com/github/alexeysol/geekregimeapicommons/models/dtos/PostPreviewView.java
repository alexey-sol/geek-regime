package com.github.alexeysol.geekregimeapicommons.models.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@JsonIgnoreProperties({ "authorId" })
public class PostPreviewView extends PostPreviewDto {
    private UserDto author;
}

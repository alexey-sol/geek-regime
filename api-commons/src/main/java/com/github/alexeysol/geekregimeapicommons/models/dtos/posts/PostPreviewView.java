package com.github.alexeysol.geekregimeapicommons.models.dtos.posts;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.github.alexeysol.geekregimeapicommons.models.dtos.users.UserDto;
import lombok.*;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({ "authorId" })
public class PostPreviewView extends PostPreviewDto {
    @Getter
    @Setter
    private UserDto author;
}

package com.github.alexeysol.geekregime.apicommons.models.dtos.posts;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.github.alexeysol.geekregime.apicommons.models.dtos.users.UserDto;
import lombok.*;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({ "authorId" })
public class PostDetailsView extends PostDetailsDto {
    @Getter
    @Setter
    private UserDto author;
}

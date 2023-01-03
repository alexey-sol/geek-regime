package com.github.alexeysol.geekregimeapicommons.models.dtos.posts;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class PostDetailsDto extends PostPreviewDto {
    protected String body;
}

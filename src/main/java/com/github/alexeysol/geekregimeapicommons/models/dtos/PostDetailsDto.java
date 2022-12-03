package com.github.alexeysol.geekregimeapicommons.models.dtos;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class PostDetailsDto extends PostPreviewDto {
    protected String body;
}

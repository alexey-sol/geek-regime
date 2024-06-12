package com.github.alexeysol.geekregime.apicommons.model.dto.post;

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

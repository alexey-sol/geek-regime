package com.github.alexeysol.geekregimeapicommons.models.dtos;

import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostPreviewDto {
    protected long id;
    protected String title;
    protected String excerpt;
    protected String slug;
    protected Date createdAt;
    protected Date updatedAt;
    protected long authorId;
}

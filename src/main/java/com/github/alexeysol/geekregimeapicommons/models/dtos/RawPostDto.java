package com.github.alexeysol.geekregimeapicommons.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RawPostDto {
    protected long id;
    protected String title;
    protected String body;
    protected String excerpt;
    protected String slug;
    protected Date createdAt;
    protected Date updatedAt;
    private long authorId;
}

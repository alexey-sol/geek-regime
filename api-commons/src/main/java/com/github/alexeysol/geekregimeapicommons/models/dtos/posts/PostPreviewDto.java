package com.github.alexeysol.geekregimeapicommons.models.dtos.posts;

import com.github.alexeysol.geekregimeapicommons.models.utils.HasId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class PostPreviewDto implements HasId {
    protected long id;
    protected String title;
    protected String excerpt;
    protected String slug;
    protected Date createdAt;
    protected Date updatedAt;
    protected long authorId;
}

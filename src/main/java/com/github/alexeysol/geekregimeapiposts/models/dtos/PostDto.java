package com.github.alexeysol.geekregimeapiposts.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {
    private long id;
    private String title;
    private String body;
    private String slug;
    private Date createdAt;
    private Date updatedAt;
    private UserDto author;
}

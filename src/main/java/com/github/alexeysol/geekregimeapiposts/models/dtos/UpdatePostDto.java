package com.github.alexeysol.geekregimeapiposts.models.dtos;

import javax.validation.constraints.Size;

public class UpdatePostDto {
    @Size(min = 1, message = "Title must not be blank")
    private String title;

    @Size(min = 1, message = "Body must not be blank")
    private String body;

    public String getTitle() {
        return title;
    }

    public String getBody() {
        return body;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setBody(String body) {
        this.body = body;
    }
}

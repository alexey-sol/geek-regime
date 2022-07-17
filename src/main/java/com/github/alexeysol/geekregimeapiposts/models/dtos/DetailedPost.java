package com.github.alexeysol.geekregimeapiposts.models.dtos;

import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.models.mappers.User;

public class DetailedPost {
    public Post post;
    public User author;

    public DetailedPost(Post post, User author) {
        this.post = post;
        this.author = author;
    }
}

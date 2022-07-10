package com.github.alexeysol.geekregimeapiposts.dtos;

import com.github.alexeysol.geekregimeapiposts.entities.Post;
import com.github.alexeysol.geekregimeapiposts.mappers.User;

public class DetailedPost {
    public Post post;
    public User author;

    public DetailedPost(Post post, User author) {
        this.post = post;
        this.author = author;
    }
}

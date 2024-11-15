package com.github.alexeysol.geekregime.apiaggregator.model;

import com.github.alexeysol.geekregime.apicommons.generated.model.UserResponse;

public interface HasAuthor {
    UserResponse getAuthor();

    void setAuthor(UserResponse author);
}

package com.github.alexeysol.geekregimeapiposts.models.mappers;

import java.util.Date;

public class User {
    private long id;
    private String email;
    private Date createdAt;
    private Date updatedAt;
    private UserDetails details;

    public long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public UserDetails getDetails() {
        return details;
    }
}

package com.github.alexeysol.geekregimeapiposts.models.mappers;

import com.github.alexeysol.geekregimeapiposts.models.Gender;

public class UserDetails {
    private String name;
    private String image;

    private Gender gender;

    public String getName() {
        return name;
    }

    public String getImage() {
        return image;
    }

    public Gender getGender() {
        return gender;
    }
}

package com.github.alexeysol.geekregimeapiposts.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDto {
    private long id;
    private String email;
    private Date createdAt;
    private Date updatedAt;
    private UserDetailsDto details;
}

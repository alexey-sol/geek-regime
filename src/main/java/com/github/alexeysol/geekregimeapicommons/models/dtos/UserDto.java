package com.github.alexeysol.geekregimeapicommons.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private long id;
    private String email;
    private Date createdAt;
    private Date updatedAt;
    private UserDetailsDto details;
}

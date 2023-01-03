package com.github.alexeysol.geekregimeapicommons.models.dtos.users;

import com.github.alexeysol.geekregimeapicommons.constants.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailsDto {
    private String name;
    private String image;
    private Gender gender;
    private Date createdAt;
    private Date updatedAt;
}

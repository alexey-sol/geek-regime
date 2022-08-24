package com.github.alexeysol.geekregimeapiposts.models.dtos;

import com.github.alexeysol.geekregimeapicommons.constants.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailsDto {
    private String name;
    private String image;
    private Gender gender;
}

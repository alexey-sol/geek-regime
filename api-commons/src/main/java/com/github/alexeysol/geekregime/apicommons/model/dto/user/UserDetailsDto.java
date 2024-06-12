package com.github.alexeysol.geekregime.apicommons.model.dto.user;

import com.github.alexeysol.geekregime.apicommons.constant.Gender;
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

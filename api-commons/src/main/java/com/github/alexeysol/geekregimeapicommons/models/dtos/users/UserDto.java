package com.github.alexeysol.geekregimeapicommons.models.dtos.users;

import com.github.alexeysol.geekregimeapicommons.models.utils.HasId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto implements HasId {
    private long id;
    private String email;
    private Date createdAt;
    private Date updatedAt;
    private UserDetailsDto details;
}

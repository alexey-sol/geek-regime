package com.github.alexeysol.geekregime.apicommons.model.dto.user;

import com.github.alexeysol.geekregime.apicommons.model.util.HasId;
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
    private String slug;
    private Date createdAt;
    private Date updatedAt;
    private UserDetailsDto details;
}

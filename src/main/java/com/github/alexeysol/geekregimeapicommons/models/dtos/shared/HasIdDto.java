package com.github.alexeysol.geekregimeapicommons.models.dtos.shared;

import com.github.alexeysol.geekregimeapicommons.models.utils.HasId;
import lombok.*;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class HasIdDto implements HasId {
    @Getter
    @Setter
    protected long id;
}

package com.github.alexeysol.geekregime.apicommons.model.dto.shared;

import com.github.alexeysol.geekregime.apicommons.model.util.HasId;
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

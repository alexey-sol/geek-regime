package com.github.alexeysol.geekregimeapicommons.models.dtos.query;

import com.github.alexeysol.geekregimeapicommons.constants.DefaultsConstants;
import org.springframework.data.domain.Sort.Direction;

public class SortByDto {
    private final String DEFAULT_FIELD = DefaultsConstants.PRIMARY_KEY_NAME;
    private final Direction DEFAULT_DIRECTION = Direction.DESC;

    private String field = DEFAULT_FIELD;
    private Direction direction = DEFAULT_DIRECTION;

    public String getField() {
        return field;
    }

    public Direction getDirection() {
        return direction;
    }
}

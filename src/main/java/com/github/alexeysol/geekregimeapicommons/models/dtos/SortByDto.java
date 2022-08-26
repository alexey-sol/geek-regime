package com.github.alexeysol.geekregimeapicommons.models.dtos;

import com.github.alexeysol.geekregimeapicommons.constants.DefaultValueConstants;
import org.springframework.data.domain.Sort.Direction;

public class SortByDto {
    private final String DEFAULT_FIELD = DefaultValueConstants.PRIMARY_KEY_NAME;
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

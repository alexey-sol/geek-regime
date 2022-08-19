package com.github.alexeysol.geekregimeapicommons.models.dtos;

import com.github.alexeysol.geekregimeapicommons.models.SortDirection;

public class SortByOptions {
    private final String DEFAULT_FIELD = "createdAt";
    private final SortDirection DEFAULT_DIRECTION = SortDirection.DESC;

    private String field = DEFAULT_FIELD;
    private SortDirection direction = DEFAULT_DIRECTION;

    public String getField() {
        return field;
    }

    public SortDirection getDirection() {
        return direction;
    }
}

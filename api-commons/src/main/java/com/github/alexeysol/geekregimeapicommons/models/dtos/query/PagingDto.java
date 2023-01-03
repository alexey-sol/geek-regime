package com.github.alexeysol.geekregimeapicommons.models.dtos.query;

import lombok.Data;

@Data
public class PagingDto {
    private final static int DEFAULT_SIZE = 10;
    private final static int DEFAULT_PAGE = 0;

    private int size = DEFAULT_SIZE;
    private int page = DEFAULT_PAGE;
}

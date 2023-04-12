package com.github.alexeysol.geekregime.apicommons.models.dtos.query;

import lombok.Data;

@Data
public class PagingCriteria {
    private final static int DEFAULT_SIZE = 10;
    private final static int DEFAULT_PAGE = 0;

    private int size = DEFAULT_SIZE;
    private int page = DEFAULT_PAGE;
}

package com.github.alexeysol.geekregimeapicommons.models.dtos;

public class PagingDto {
    private final int DEFAULT_SIZE = 10;
    private final int DEFAULT_PAGE = 0;

    private int size = DEFAULT_SIZE;
    private int page = DEFAULT_PAGE;

    public int getPage() {
        return page;
    }

    public int getSize() {
        return size;
    }
}

package com.github.alexeysol.geekregimeapicommons.models.dtos;

public class PageImplDeserializer<Content> {
    private Content content;
    private int size;
    private int totalElements;

    public Content getContent() {
        return content;
    }

    public int getSize() {
        return size;
    }

    public int getTotalElements() {
        return totalElements;
    }
}

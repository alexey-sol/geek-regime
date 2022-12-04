package com.github.alexeysol.geekregimeapicommons.models.utils;

import java.util.List;

public class BasicPage<Item> {
    private List<Item> content;
    private int size;
    private int totalElements;

    public BasicPage() {}

    public List<Item> getContent() {
        return content;
    }

    public int getSize() {
        return size;
    }

    public int getTotalElements() {
        return totalElements;
    }

    private void setContent(List<Item> content) {
        this.content = content;
    }

    private void setSize(int size) {
        this.size = size;
    }

    private void setTotalElements(int totalElements) {
        this.totalElements = totalElements;
    }

    public <NewItem> BasicPage<NewItem> convertContent(List<NewItem> content) {
        BasicPage<NewItem> result = new BasicPage<>();
        result.setContent(content);
        result.setSize(size);
        result.setTotalElements(totalElements);
        return result;
    }
}

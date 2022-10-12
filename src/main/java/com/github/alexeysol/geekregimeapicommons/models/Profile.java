package com.github.alexeysol.geekregimeapicommons.models;

public enum Profile {
    DEV("dev"),
    PROD("prod");

    private final String value;

    Profile(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}

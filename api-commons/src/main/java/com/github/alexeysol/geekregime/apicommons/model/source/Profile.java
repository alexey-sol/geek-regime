package com.github.alexeysol.geekregime.apicommons.model.source;

public enum Profile {
    DEV("dev"),
    PROD("prod");

    private final String value;

    Profile(String value) {
        this.value = value;
    }

    public String value() {
        return value;
    }
}

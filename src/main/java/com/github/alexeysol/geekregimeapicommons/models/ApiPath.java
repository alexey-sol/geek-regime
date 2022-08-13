package com.github.alexeysol.geekregimeapicommons.models;

public interface ApiPath {
    String getApiPath(int version);

    default String formatApiPath(String prefix, int version, String resource) {
        return String.format("/%s/v%d/%s", prefix, version, resource);
    }
}

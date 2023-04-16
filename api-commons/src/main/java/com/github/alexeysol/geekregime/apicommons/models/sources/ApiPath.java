package com.github.alexeysol.geekregime.apicommons.models.sources;

public interface ApiPath {
    String getApiPath(int version);

    default String formatApiPath(String prefix, int version, String resource) {
        return String.format("/%s/v%d/%s", prefix, version, resource);
    }

    default String formatApiPath(int version, String resource) {
        return String.format("/v%d/%s", version, resource);
    }
}

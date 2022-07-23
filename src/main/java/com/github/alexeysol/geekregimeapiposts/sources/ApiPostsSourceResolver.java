package com.github.alexeysol.geekregimeapiposts.sources;

import com.github.alexeysol.geekregimeapicommons.models.ApiPath;
import com.github.alexeysol.geekregimeapicommons.models.BaseUrl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ApiPostsSourceResolver implements ApiPath, BaseUrl {
    @Value("${api-posts.base-url}")
    private String baseUrl;

    @Value("${api-posts.prefix}")
    private String apiPrefix;

    @Value("${api-posts.resource}")
    private String resource;

    public String getBaseUrl() {
        return baseUrl;
    }

    public String getApiPath(int version) {
        return String.format("/%s/v%d/%s", apiPrefix, version, resource); // TODO create path formatter in commons?
    }
}

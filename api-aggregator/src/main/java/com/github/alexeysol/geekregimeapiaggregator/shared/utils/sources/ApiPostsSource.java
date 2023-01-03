package com.github.alexeysol.geekregimeapiaggregator.shared.utils.sources;

import com.github.alexeysol.geekregimeapicommons.models.sources.ApiPath;
import com.github.alexeysol.geekregimeapicommons.models.sources.BaseUrl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ApiPostsSource implements ApiPath, BaseUrl {
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
        return formatApiPath(apiPrefix, version, resource);
    }
}

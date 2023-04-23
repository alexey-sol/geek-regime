package com.github.alexeysol.geekregime.apiaggregator.shared.utils.sources;

import com.github.alexeysol.geekregime.apicommons.models.sources.ApiPath;
import com.github.alexeysol.geekregime.apicommons.models.sources.BaseUrl;
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

    public String getResource() {
        return resource;
    }

    public String getApiPath(int version) {
        return formatApiPath(apiPrefix, version);
    }
}

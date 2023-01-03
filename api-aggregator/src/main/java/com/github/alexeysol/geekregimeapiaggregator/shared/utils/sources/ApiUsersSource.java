package com.github.alexeysol.geekregimeapiaggregator.shared.utils.sources;

import com.github.alexeysol.geekregimeapicommons.models.sources.ApiPath;
import com.github.alexeysol.geekregimeapicommons.models.sources.BaseUrl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ApiUsersSource implements ApiPath, BaseUrl {
    @Value("${api-users.base-url}")
    private String baseUrl;

    @Value("${api-users.prefix}")
    private String apiPrefix;

    @Value("${api-users.resource}")
    private String resource;

    public String getBaseUrl() {
        return baseUrl;
    }

    public String getApiPath(int version) {
        return String.format("/%s/v%d/%s", apiPrefix, version, resource);
    }
}

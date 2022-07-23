package com.github.alexeysol.geekregimeapiposts.sources;

import com.github.alexeysol.geekregimeapicommons.models.ApiPath;
import com.github.alexeysol.geekregimeapicommons.models.BaseUrl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ApiUsersSourceResolver implements ApiPath, BaseUrl {
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

package com.github.alexeysol.geekregimeapiposts.utils.sources;

import com.github.alexeysol.geekregimeapicommons.models.ApiPath;
import com.github.alexeysol.geekregimeapicommons.models.BaseUrl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ApiPostsSource implements ApiPath, BaseUrl {
    private static final String PRODUCTION_PROFILE = "prod";

    @Value("${spring.profiles.active}")
    private String activeProfile;

    @Value("${api-posts.base-url}")
    private String baseUrl;

    @Value("${api-posts.prefix}")
    private String apiPrefix;

    @Value("${api-posts.resource}")
    private String resource;

    public boolean isProduction() { // TODO new interfaces for isProduction and stuff?
        return PRODUCTION_PROFILE.equals(activeProfile);
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public String getApiPath(int version) {
        return formatApiPath(apiPrefix, version, resource);
    }

    public String getResource() {
        return resource;
    }
}

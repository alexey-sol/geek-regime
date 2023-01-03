package com.github.alexeysol.geekregime.apiposts.utils.sources;

import com.github.alexeysol.geekregime.apicommons.models.sources.ActiveProfile;
import com.github.alexeysol.geekregime.apicommons.models.sources.ApiPath;
import com.github.alexeysol.geekregime.apicommons.models.sources.BaseUrl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ApiPostsSource implements ApiPath, BaseUrl, ActiveProfile {
    @Value("${spring.profiles.active}")
    private String activeProfile;

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

    @Override
    public String getActiveProfile() {
        return activeProfile;
    }

    public String getResource() {
        return resource;
    }
}

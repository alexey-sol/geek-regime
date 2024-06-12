package com.github.alexeysol.geekregime.apiposts.util.source;

import com.github.alexeysol.geekregime.apicommons.model.source.ActiveProfile;
import com.github.alexeysol.geekregime.apicommons.model.source.BaseUrl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ApiPostsSource implements BaseUrl, ActiveProfile {
    @Value("${spring.profiles.active}")
    private String activeProfile;

    @Value("${api-posts.base-url}")
    private String baseUrl;

    public String getBaseUrl() {
        return baseUrl;
    }

    @Override
    public String getActiveProfile() {
        return activeProfile;
    }
}

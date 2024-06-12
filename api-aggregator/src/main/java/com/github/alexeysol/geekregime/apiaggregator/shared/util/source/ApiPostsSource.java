package com.github.alexeysol.geekregime.apiaggregator.shared.util.source;

import com.github.alexeysol.geekregime.apicommons.model.source.BaseUrl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ApiPostsSource implements BaseUrl {
    @Value("${api-posts.base-url}")
    private String baseUrl;

    public String getBaseUrl() {
        return baseUrl;
    }
}

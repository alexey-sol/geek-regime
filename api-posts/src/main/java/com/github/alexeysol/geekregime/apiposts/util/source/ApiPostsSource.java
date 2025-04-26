package com.github.alexeysol.geekregime.apiposts.util.source;

import com.github.alexeysol.geekregime.apicommons.model.source.ActiveProfile;
import com.github.alexeysol.geekregime.apicommons.model.source.BaseUrl;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ApiPostsSource implements BaseUrl, ActiveProfile {
    @Value("${spring.profiles.active}")
    private String activeProfile;

    @Getter
    @Value("${service.app.base-url}")
    private String baseUrl;

    @Override
    public String getActiveProfile() {
        return activeProfile;
    }
}

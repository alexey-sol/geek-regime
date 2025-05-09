package com.github.alexeysol.geekregime.apiaggregator.features.space.service.v1;

import com.fasterxml.jackson.core.type.TypeReference;
import com.github.alexeysol.geekregime.apiaggregator.shared.util.HttpEndpoint;
import com.github.alexeysol.geekregime.apiaggregator.shared.util.UriUtil;
import com.github.alexeysol.geekregime.apiaggregator.shared.util.source.ApiPostsSource;
import com.github.alexeysol.geekregime.apicommons.generated.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.net.http.HttpClient;
import java.util.List;
import java.util.Map;

import static com.github.alexeysol.geekregime.apicommons.constant.ResourceConstant.*;

@Service
@RequiredArgsConstructor
public class SpaceService {
    private final HttpClient httpClient;
    private final ApiPostsSource source;

    public SpacePageResponse findAllSpaces(Map<String, String> params) {
        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), SPACES, params)
            .build()
            .toUri();

        return new HttpEndpoint(httpClient, uri).request(new TypeReference<>() {});
    }

    public SpaceResponse findSpaceBySlug(String slug) {
        String path = String.format("%s/%s", SPACES, slug);

        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), path)
            .build()
            .toUri();

        return new HttpEndpoint(httpClient, uri).request(new TypeReference<>() {});
    }

    public List<SpaceResponse> saveSpaces(String originalRequest) {
        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), SPACES)
            .build()
            .toUri();

        return new HttpEndpoint(httpClient, uri)
            .method("PUT", originalRequest)
            .request(new TypeReference<>() {});
    }

    public IdResponse removeSpaceById(long id) {
        String path = String.format("%s/%d", SPACES, id);

        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), path)
            .build()
            .toUri();

        return new HttpEndpoint(httpClient, uri)
            .method("DELETE")
            .request(new TypeReference<>() {});
    }
}

package com.github.alexeysol.geekregimeapiaggregator.features.posts.services.v1;

import com.fasterxml.jackson.core.type.TypeReference;
import com.github.alexeysol.geekregimeapiaggregator.shared.constants.PathConstants;
import com.github.alexeysol.geekregimeapiaggregator.shared.utils.sources.ApiPostsSource;
import com.github.alexeysol.geekregimeapicommons.exceptions.SerializedApiException;
import com.github.alexeysol.geekregimeapicommons.models.BasicPage;
import com.github.alexeysol.geekregimeapicommons.models.Pair;
import com.github.alexeysol.geekregimeapicommons.models.dtos.DeletionResultDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.RawPostDto;
import com.github.alexeysol.geekregimeapicommons.utils.http.Request;
import com.github.alexeysol.geekregimeapicommons.utils.http.ResponseReader;
import org.springframework.stereotype.Service;

import java.net.http.HttpResponse;
import java.util.Optional;

@Service
public class PostService {
    private final ApiPostsSource source;
    public PostService(ApiPostsSource source) {
        this.source = source;
    }

    public BasicPage<RawPostDto> findAllPosts(
        Optional<String> paging,
        Optional<String> sortBy
    ) {
        Request request = new Request(getApiPostsUrl());

        paging.ifPresent(json -> request.addQueryParam("paging", json));
        sortBy.ifPresent(json -> request.addQueryParam("sortBy", json));

        HttpResponse<String> response = request.GET()
            .send()
            .join();

        try {
            return new ResponseReader(response).content(new TypeReference<>() {});
        } catch (IllegalArgumentException exception) {
            throw new SerializedApiException(response.body());
        }
    }

    public RawPostDto findPostBySlug(String slug) {
        HttpResponse<String> response = new Request(getApiPostsUrl())
            .addPathVariable(slug)
            .GET()
            .send()
            .join();

        try {
            return new ResponseReader(response).content(RawPostDto.class);
        } catch (IllegalArgumentException exception) {
            throw new SerializedApiException(response.body());
        }
    }

    public RawPostDto createPost(String dto) {
        HttpResponse<String> response = new Request(getApiPostsUrl())
            .POST(dto)
            .send()
            .join();

        try {
            return new ResponseReader(response).content(RawPostDto.class);
        } catch (IllegalArgumentException exception) {
            throw new SerializedApiException(response.body());
        }
    }

    public RawPostDto updatePost(long id, String dto) {
        HttpResponse<String> response = new Request(getApiPostsUrl())
            .addPathVariable(id)
            .PATCH(dto)
            .send()
            .join();

        try {
            return new ResponseReader(response).content(RawPostDto.class);
        } catch (IllegalArgumentException exception) {
            throw new SerializedApiException(response.body());
        }
    }

    public DeletionResultDto removePostById(long id) {
        HttpResponse<String> response = new Request(getApiPostsUrl())
            .addPathVariable(id)
            .DELETE()
            .send()
            .join();

        try {
            return new ResponseReader(response).content(DeletionResultDto.class);
        } catch (IllegalArgumentException exception) {
            throw new SerializedApiException(response.body());
        }
    }

    private String getApiPostsUrl() {
        String apiPath = source.getApiPath(PathConstants.V1);
        return source.getBaseUrl() + apiPath;
    }
}

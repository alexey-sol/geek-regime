package com.github.alexeysol.geekregimeapiaggregator.features.posts.services.v1;

import com.fasterxml.jackson.core.type.TypeReference;
import com.github.alexeysol.geekregimeapiaggregator.shared.constants.PathConstants;
import com.github.alexeysol.geekregimeapiaggregator.shared.utils.sources.ApiPostsSource;
import com.github.alexeysol.geekregimeapicommons.exceptions.SerializedApiException;
import com.github.alexeysol.geekregimeapicommons.models.BasicPage;
import com.github.alexeysol.geekregimeapicommons.models.Pair;
import com.github.alexeysol.geekregimeapicommons.models.dtos.DeletionResultDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.RawPostDto;
import com.github.alexeysol.geekregimeapicommons.utils.Json;
import com.github.alexeysol.geekregimeapicommons.utils.Request;
import org.springframework.stereotype.Service;

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

        paging.ifPresent(value -> request.addQueryParams(new Pair<>("paging", value)));
        sortBy.ifPresent(value -> request.addQueryParams(new Pair<>("sortBy", value)));

        String json = request.get().getResult();

        try {
            Json.assertJsonIsNotApiException(json);
            return Json.parse(json, new TypeReference<>() {});
        } catch (IllegalArgumentException exception) {
            throw new SerializedApiException(json);
        }
    }

    public RawPostDto findPostBySlug(String slug) {
        String json = new Request(getApiPostsUrl())
            .addPathVariable(slug)
            .get()
            .getResult();

        try {
            Json.assertJsonIsNotApiException(json);
            return Json.parse(json, RawPostDto.class);
        } catch (IllegalArgumentException exception) {
            throw new SerializedApiException(json);
        }
    }

    public RawPostDto createPost(String dto) {
        String json = new Request(getApiPostsUrl())
            .post(dto)
            .getResult();

        try {
            Json.assertJsonIsNotApiException(json);
            return Json.parse(json, RawPostDto.class);
        } catch (IllegalArgumentException exception) {
            throw new SerializedApiException(json);
        }
    }

    public RawPostDto updatePost(long id, String dto) {
        String json = new Request(getApiPostsUrl())
            .addPathVariable(id)
            .patch(dto)
            .getResult();

        try {
            Json.assertJsonIsNotApiException(json);
            return Json.parse(json, RawPostDto.class);
        } catch (IllegalArgumentException exception) {
            throw new SerializedApiException(json);
        }
    }

    public DeletionResultDto removePostById(long id) {
        String json = new Request(getApiPostsUrl())
            .addPathVariable(id)
            .delete()
            .getResult();

        try {
            Json.assertJsonIsNotApiException(json);
            return Json.parse(json, DeletionResultDto.class);
        } catch (IllegalArgumentException exception) {
            throw new SerializedApiException(json);
        }
    }

    private String getApiPostsUrl() {
        String apiPath = source.getApiPath(PathConstants.V1);
        return source.getBaseUrl() + apiPath;
    }
}

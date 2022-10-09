package com.github.alexeysol.geekregimeapiaggregator.features.posts.services.v1;

import com.fasterxml.jackson.core.type.TypeReference;
import com.github.alexeysol.geekregimeapiaggregator.shared.constants.PathConstants;
import com.github.alexeysol.geekregimeapiaggregator.shared.utils.sources.ApiPostsSourceResolver;
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
    private final ApiPostsSourceResolver sourceResolver;

    public PostService(ApiPostsSourceResolver sourceResolver) {
        this.sourceResolver = sourceResolver;
    }

    public BasicPage<RawPostDto> findAllPosts(
        Optional<String> paging,
        Optional<String> sortBy
    ) {
        Request request = new Request(getApiPostsUrl());

        paging.ifPresent(value -> request.addQueryParams(new Pair<>("paging", value)));
        sortBy.ifPresent(value -> request.addQueryParams(new Pair<>("sortBy", value)));

        String postsPageJson = request.get().getResult();
        return Json.parse(postsPageJson, new TypeReference<>() {});
    }

    public RawPostDto findPostBySlug(String slug) {
        String postJson = new Request(getApiPostsUrl())
            .addPathVariable(slug)
            .get()
            .getResult();

        return Json.parse(postJson, RawPostDto.class);
    }

    public RawPostDto createPost(String dto) {
        String postJson = new Request(getApiPostsUrl())
            .post(dto)
            .getResult();

        return Json.parse(postJson, RawPostDto.class);
    }

    public RawPostDto updatePost(long id, String dto) {
        String postJson = new Request(getApiPostsUrl())
            .addPathVariable(id)
            .patch(dto)
            .getResult();

        return Json.parse(postJson, RawPostDto.class);
    }

    public DeletionResultDto removePostById(long id) {
        String deletedPostIdJson = new Request(getApiPostsUrl())
            .addPathVariable(id)
            .delete()
            .getResult();

        return Json.parse(deletedPostIdJson, DeletionResultDto.class);
    }

    private String getApiPostsUrl() {
        String apiPath = sourceResolver.getApiPath(PathConstants.V1);
        return sourceResolver.getBaseUrl() + apiPath;
    }
}

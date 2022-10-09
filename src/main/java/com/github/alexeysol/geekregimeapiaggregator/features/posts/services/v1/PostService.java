package com.github.alexeysol.geekregimeapiaggregator.features.posts.services.v1;

import com.fasterxml.jackson.core.type.TypeReference;
import com.github.alexeysol.geekregimeapiaggregator.shared.constants.PathConstants;
import com.github.alexeysol.geekregimeapiaggregator.shared.utils.sources.ApiPostsSourceResolver;
import com.github.alexeysol.geekregimeapicommons.models.BasicPage;
import com.github.alexeysol.geekregimeapicommons.models.Pair;
import com.github.alexeysol.geekregimeapicommons.models.dtos.RawPostDto;
import com.github.alexeysol.geekregimeapicommons.utils.Json;
import com.github.alexeysol.geekregimeapicommons.utils.Request;
import org.springframework.stereotype.Service;

import java.net.URISyntaxException;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Service
public class PostService {
    private String apiPostsBaseUrl = "";

    private final ApiPostsSourceResolver sourceResolver;

    public PostService(ApiPostsSourceResolver sourceResolver) {
        this.sourceResolver = sourceResolver;
    }

    public void setApiPostsUrl(String apiPostsBaseUrl) {
        this.apiPostsBaseUrl = apiPostsBaseUrl;
    }

    public BasicPage<RawPostDto> findAllPosts(
        Optional<String> paging,
        Optional<String> sortBy
    ) {
        try {
            String postsPageJson = requestAllPostsAndGetResult(paging, sortBy);
            return Json.parse(postsPageJson, new TypeReference<>() {});
        } catch (IllegalArgumentException exception) {
            throw exception;
        } catch (Exception exception) {
            throw new RuntimeException(exception.getMessage());
        }
    }

    private String requestAllPostsAndGetResult(
        Optional<String> paging,
        Optional<String> sortBy
    ) throws ExecutionException, URISyntaxException, InterruptedException {
        Request request = new Request(getApiPostsUrl());

        paging.ifPresent(value -> request.addQueryParams(new Pair<>("paging", value)));
        sortBy.ifPresent(value -> request.addQueryParams(new Pair<>("sortBy", value)));

        return request.get()
            .getResult();
    }

    private String getApiPostsUrl() {
        String apiPath = sourceResolver.getApiPath(PathConstants.V1);
        String baseUrl = (apiPostsBaseUrl.isEmpty())
            ? sourceResolver.getBaseUrl()
            : apiPostsBaseUrl;

        return baseUrl + apiPath;
    }
}

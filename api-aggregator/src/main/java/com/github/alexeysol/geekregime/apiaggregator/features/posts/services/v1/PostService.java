package com.github.alexeysol.geekregime.apiaggregator.features.posts.services.v1;

import com.fasterxml.jackson.core.type.TypeReference;
import com.github.alexeysol.geekregime.apiaggregator.shared.constants.PathConstants;
import com.github.alexeysol.geekregime.apiaggregator.shared.utils.sources.ApiPostsSource;
import com.github.alexeysol.geekregime.apicommons.exceptions.SerializedApiException;
import com.github.alexeysol.geekregime.apicommons.models.dtos.posts.PostDetailsDto;
import com.github.alexeysol.geekregime.apicommons.models.dtos.posts.PostPreviewDto;
import com.github.alexeysol.geekregime.apicommons.models.dtos.shared.HasIdDto;
import com.github.alexeysol.geekregime.apicommons.models.utils.BasicPage;
import com.github.alexeysol.geekregime.apicommons.utils.http.Request;
import com.github.alexeysol.geekregime.apicommons.utils.http.ResponseReader;
import org.springframework.stereotype.Service;

import java.net.http.HttpResponse;
import java.util.Optional;

@Service
public class PostService {
    private final ApiPostsSource source;
    public PostService(ApiPostsSource source) {
        this.source = source;
    }

    public BasicPage<PostPreviewDto> findAllPosts(
        Optional<String> paging,
        Optional<String> sortBy,
        Optional<String> searchBy
    ) {
        Request request = new Request(getApiPostsUrl());

        paging.ifPresent(json -> request.addQueryParam("paging", json));
        sortBy.ifPresent(json -> request.addQueryParam("sortBy", json));
        searchBy.ifPresent(json -> request.addQueryParam("searchBy", json));

        HttpResponse<String> response = request.GET()
            .send()
            .join();

        try {
            return new ResponseReader(response).content(new TypeReference<>() {});
        } catch (IllegalArgumentException exception) {
            throw new SerializedApiException(response.body());
        }
    }

    public PostDetailsDto findPostBySlug(String slug) {
        HttpResponse<String> response = new Request(getApiPostsUrl())
            .addPathVariable(slug)
            .GET()
            .send()
            .join();

        try {
            return new ResponseReader(response).content(PostDetailsDto.class);
        } catch (IllegalArgumentException exception) {
            throw new SerializedApiException(response.body());
        }
    }

    public PostDetailsDto createPost(String dto) {
        HttpResponse<String> response = new Request(getApiPostsUrl())
            .POST(dto)
            .send()
            .join();

        try {
            return new ResponseReader(response).content(PostDetailsDto.class);
        } catch (IllegalArgumentException exception) {
            throw new SerializedApiException(response.body());
        }
    }

    public PostDetailsDto updatePost(long id, String dto) {
        HttpResponse<String> response = new Request(getApiPostsUrl())
            .addPathVariable(id)
            .PATCH(dto)
            .send()
            .join();

        try {
            return new ResponseReader(response).content(PostDetailsDto.class);
        } catch (IllegalArgumentException exception) {
            throw new SerializedApiException(response.body());
        }
    }

    public HasIdDto removePostById(long id) {
        HttpResponse<String> response = new Request(getApiPostsUrl())
            .addPathVariable(id)
            .DELETE()
            .send()
            .join();

        try {
            return new ResponseReader(response).content(HasIdDto.class);
        } catch (IllegalArgumentException exception) {
            throw new SerializedApiException(response.body());
        }
    }

    private String getApiPostsUrl() {
        String apiPath = source.getApiPath(PathConstants.V1);
        return source.getBaseUrl() + apiPath;
    }
}

package com.github.alexeysol.geekregime.apiaggregator.features.posts.services.v1;

import com.fasterxml.jackson.core.type.TypeReference;
import com.github.alexeysol.geekregime.apiaggregator.shared.constants.PathConstants;
import com.github.alexeysol.geekregime.apiaggregator.shared.utils.sources.ApiPostsSource;
import com.github.alexeysol.geekregime.apiaggregator.shared.utils.sources.ApiUsersSource;
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
    private final String POSTS_RESOURCE;
    private final String USERS_RESOURCE;

    private final ApiPostsSource apiPostsSource;

    public PostService(ApiPostsSource apiPostsSource, ApiUsersSource apiUsersSource) {
        this.apiPostsSource = apiPostsSource;

        POSTS_RESOURCE = apiPostsSource.getResource();
        USERS_RESOURCE = apiUsersSource.getResource();
    }

    public BasicPage<PostPreviewDto> findAllPosts(
        long authorId,
        Optional<String> paging,
        Optional<String> sortBy,
        Optional<String> searchBy
    ) {
        String path = String.format("/%s/%d/%s", USERS_RESOURCE, authorId, POSTS_RESOURCE);

        return findAllPosts(path, paging, sortBy, searchBy);
    }

    public BasicPage<PostPreviewDto> findAllPosts(
        Optional<String> paging,
        Optional<String> sortBy,
        Optional<String> searchBy
    ) {
        String path = String.format("/%s", POSTS_RESOURCE);

        return findAllPosts(path, paging, sortBy, searchBy);
    }

    private BasicPage<PostPreviewDto> findAllPosts(
        String path,
        Optional<String> paging,
        Optional<String> sortBy,
        Optional<String> searchBy
    ) {
        Request request = new Request(getApiUrl(path));

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
        String path = String.format("/%s/%s", POSTS_RESOURCE, slug);

        HttpResponse<String> response = new Request(getApiUrl(path))
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
        String path = String.format("/%s", POSTS_RESOURCE);

        HttpResponse<String> response = new Request(getApiUrl(path))
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
        String path = String.format("/%s/%d", POSTS_RESOURCE, id);

        HttpResponse<String> response = new Request(getApiUrl(path))
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
        String path = String.format("/%s/%d", POSTS_RESOURCE, id);

        HttpResponse<String> response = new Request(getApiUrl(path))
            .DELETE()
            .send()
            .join();

        try {
            return new ResponseReader(response).content(HasIdDto.class);
        } catch (IllegalArgumentException exception) {
            throw new SerializedApiException(response.body());
        }
    }

    private String getApiUrl(String path) {
        String apiPath = apiPostsSource.getApiPath(PathConstants.V1);
        return apiPostsSource.getBaseUrl() + apiPath + path;
    }
}

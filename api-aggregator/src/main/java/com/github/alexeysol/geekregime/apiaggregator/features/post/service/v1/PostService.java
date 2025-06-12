package com.github.alexeysol.geekregime.apiaggregator.features.post.service.v1;

import com.fasterxml.jackson.core.type.TypeReference;
import com.github.alexeysol.geekregime.apiaggregator.shared.util.HttpEndpoint;
import com.github.alexeysol.geekregime.apiaggregator.shared.util.UriUtil;
import com.github.alexeysol.geekregime.apiaggregator.shared.util.source.ApiPostsSource;
import com.github.alexeysol.geekregime.apicommons.generated.model.BasePostPreviewResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.IdResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.BasePostDetailsResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.BasePostPreviewPageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.net.http.HttpClient;
import java.util.List;
import java.util.Map;

import static com.github.alexeysol.geekregime.apicommons.constant.ResourceConstant.POSTS;
import static com.github.alexeysol.geekregime.apicommons.constant.ResourceConstant.SPACES;
import static com.github.alexeysol.geekregime.apicommons.constant.ResourceConstant.USERS;

@Service
@RequiredArgsConstructor
public class PostService {
    private final HttpClient httpClient;
    private final ApiPostsSource source;

    public BasePostPreviewPageResponse findAllPostsByAuthor(long authorId, Map<String, String> params) {
        String path = String.format("%s/%d/%s", USERS, authorId, POSTS);

        return findAllPosts(path, params);
    }

    public BasePostPreviewPageResponse findAllPostsBySpace(long spaceId, Map<String, String> params) {
        String path = String.format("%s/%d/%s", SPACES, spaceId, POSTS);

        return findAllPosts(path, params);
    }

    public BasePostPreviewPageResponse findAllPosts(Map<String, String> params) {
        return findAllPosts(POSTS, params);
    }

    private BasePostPreviewPageResponse findAllPosts(String path, Map<String, String> params) {
        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), path, params)
            .build()
            .toUri();

        return new HttpEndpoint(httpClient, uri).request(new TypeReference<>() {});
    }

    public List<BasePostPreviewResponse> findAllPostsById(Map<String, String> params) {
        String path = String.format("%s/id", POSTS);

        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), path, params)
            .build()
            .toUri();

        return new HttpEndpoint(httpClient, uri).request(new TypeReference<>() {});
    }

    public BasePostDetailsResponse findPostBySlug(String slug) {
        String path = String.format("%s/%s", POSTS, slug);

        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), path)
            .build()
            .toUri();

        return new HttpEndpoint(httpClient, uri).request(new TypeReference<>() {});
    }

    public BasePostDetailsResponse createPost(String originalRequest) {
        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), POSTS)
            .build()
            .toUri();

        return new HttpEndpoint(httpClient, uri)
            .method("POST", originalRequest)
            .request(new TypeReference<>() {});
    }

    public BasePostDetailsResponse updatePost(long id, String originalRequest) {
        String path = String.format("%s/%d", POSTS, id);

        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), path)
            .build()
            .toUri();

        return new HttpEndpoint(httpClient, uri)
            .method("PATCH", originalRequest)
            .request(new TypeReference<>() {});
    }

    public IdResponse removePostById(long id) {
        String path = String.format("%s/%d", POSTS, id);

        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), path)
            .build()
            .toUri();

        return new HttpEndpoint(httpClient, uri)
            .method("DELETE")
            .request(new TypeReference<>() {});
    }

    public BasePostDetailsResponse voteOnPost(long userId, long postId, String originalRequest) {
        String path = String.format("%s/%d/%s/%d/vote", USERS, userId, POSTS, postId);

        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), path)
            .build()
            .toUri();

        return new HttpEndpoint(httpClient, uri)
            .method("PUT", originalRequest)
            .request(new TypeReference<>() {});
    }
}

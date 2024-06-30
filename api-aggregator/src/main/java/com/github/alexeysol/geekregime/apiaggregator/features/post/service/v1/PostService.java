package com.github.alexeysol.geekregime.apiaggregator.features.post.service.v1;

import com.fasterxml.jackson.core.type.TypeReference;
import com.github.alexeysol.geekregime.apiaggregator.shared.util.UriUtil;
import com.github.alexeysol.geekregime.apiaggregator.shared.util.source.ApiPostsSource;
import com.github.alexeysol.geekregime.apicommons.generated.model.IdResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.PostDetailsResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.PostPreviewPageResponse;
import com.github.alexeysol.geekregime.apicommons.util.http.AppHttpClient;
import com.github.alexeysol.geekregime.apicommons.util.http.AppHttpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.net.http.HttpRequest;
import java.util.Map;

import static com.github.alexeysol.geekregime.apicommons.constant.ResourceConstant.POSTS;
import static com.github.alexeysol.geekregime.apicommons.constant.ResourceConstant.USERS;

@Service
@RequiredArgsConstructor
public class PostService {
    private final ApiPostsSource source;

    public PostPreviewPageResponse findAllPosts(long authorId, Map<String, String> params) {
        String path = String.format("%s/%d/%s", USERS, authorId, POSTS);

        return findAllPosts(path, params);
    }

    public PostPreviewPageResponse findAllPosts(Map<String, String> params) {
        return findAllPosts(POSTS, params);
    }

    private PostPreviewPageResponse findAllPosts(String path, Map<String, String> params) {
        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), path, params)
            .build()
            .toUri();

        var request = AppHttpRequest.builder()
            .uri(uri)
            .GET()
            .build();

        return AppHttpClient.send(request, new TypeReference<>() {});
    }

    public PostDetailsResponse findPostBySlug(String slug) {
        String path = String.format("%s/%s", POSTS, slug);

        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), path)
            .build()
            .toUri();

        var request = AppHttpRequest.builder()
            .uri(uri)
            .GET()
            .build();

        return AppHttpClient.send(request, new TypeReference<>() {});
    }

    public PostDetailsResponse createPost(String originalRequest) {
        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), POSTS)
            .build()
            .toUri();

        var request = AppHttpRequest.builder()
            .uri(uri)
            .POST(HttpRequest.BodyPublishers.ofString(originalRequest))
            .build();

        return AppHttpClient.send(request, new TypeReference<>() {});
    }

    public PostDetailsResponse updatePost(long id, String originalRequest) {
        String path = String.format("%s/%d", POSTS, id);

        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), path)
            .build()
            .toUri();

        var request = AppHttpRequest.builder()
            .uri(uri)
            .method("PATCH", HttpRequest.BodyPublishers.ofString(originalRequest))
            .build();

        return AppHttpClient.send(request, new TypeReference<>() {});
    }

    public IdResponse removePostById(long id) {
        String path = String.format("%s/%d", POSTS, id);

        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), path)
            .build()
            .toUri();

        var request = AppHttpRequest.builder()
            .uri(uri)
            .method("DELETE", HttpRequest.BodyPublishers.noBody())
            .build();

        return AppHttpClient.send(request, new TypeReference<>() {});
    }
}

package com.github.alexeysol.geekregime.apiaggregator.features.post.service.v1;

import com.fasterxml.jackson.core.type.TypeReference;
import com.github.alexeysol.geekregime.apiaggregator.shared.util.UriUtil;
import com.github.alexeysol.geekregime.apiaggregator.shared.util.source.ApiPostsSource;
import com.github.alexeysol.geekregime.apicommons.model.dto.post.PostDetailsDto;
import com.github.alexeysol.geekregime.apicommons.model.dto.post.PostPreviewDto;
import com.github.alexeysol.geekregime.apicommons.model.dto.shared.HasIdDto;
import com.github.alexeysol.geekregime.apicommons.model.util.BasicPage;
import com.github.alexeysol.geekregime.apicommons.util.http.AppHttpClient;
import com.github.alexeysol.geekregime.apicommons.util.http.AppHttpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.net.http.HttpRequest;
import java.util.Map;

import static com.github.alexeysol.geekregime.apicommons.constant.ResourceConstant.*;

@Service
@RequiredArgsConstructor
public class PostService {
    private final ApiPostsSource source;

    public BasicPage<PostPreviewDto> findAllPosts(long authorId, Map<String, String> params) {
        String path = String.format("%s/%d/%s", USERS, authorId, POSTS);

        return findAllPosts(path, params);
    }

    public BasicPage<PostPreviewDto> findAllPosts(Map<String, String> params) {
        return findAllPosts(POSTS, params);
    }

    private BasicPage<PostPreviewDto> findAllPosts(String path, Map<String, String> params) {
        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), path, params)
            .build()
            .toUri();

        var request = AppHttpRequest.builder()
            .uri(uri)
            .GET()
            .build();

        return AppHttpClient.send(request, new TypeReference<>() {});
    }

    public PostDetailsDto findPostBySlug(String slug) {
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

    public PostDetailsDto createPost(String dto) {
        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), POSTS)
            .build()
            .toUri();

        var request = AppHttpRequest.builder()
            .uri(uri)
            .POST(HttpRequest.BodyPublishers.ofString(dto))
            .build();

        return AppHttpClient.send(request, new TypeReference<>() {});
    }

    public PostDetailsDto updatePost(long id, String dto) {
        String path = String.format("%s/%d", POSTS, id);

        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), path)
            .build()
            .toUri();

        var request = AppHttpRequest.builder()
            .uri(uri)
            .method("PATCH", HttpRequest.BodyPublishers.ofString(dto))
            .build();

        return AppHttpClient.send(request, new TypeReference<>() {});
    }

    public HasIdDto removePostById(long id) {
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

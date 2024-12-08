package com.github.alexeysol.geekregime.apiaggregator.features.post.service.v1;

import com.fasterxml.jackson.core.type.TypeReference;
import com.github.alexeysol.geekregime.apiaggregator.shared.util.HttpEndpoint;
import com.github.alexeysol.geekregime.apiaggregator.shared.util.UriUtil;
import com.github.alexeysol.geekregime.apiaggregator.shared.util.source.ApiPostsSource;
import com.github.alexeysol.geekregime.apicommons.generated.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.net.http.HttpClient;
import java.util.Map;

import static com.github.alexeysol.geekregime.apicommons.constant.ResourceConstant.COMMENTS;
import static com.github.alexeysol.geekregime.apicommons.constant.ResourceConstant.POSTS;
import static com.github.alexeysol.geekregime.apicommons.constant.ResourceConstant.USERS;

@Service
@RequiredArgsConstructor
public class PostCommentService {
    private final HttpClient httpClient;
    private final ApiPostsSource source;

    public BasePostCommentPageResponse findAllPostCommentsByAuthor(long authorId, Map<String, String> params) {
        String path = String.format("%s/%d/%s", USERS, authorId, COMMENTS);

        return findAllPostComments(path, params);
    }

    public BasePostCommentPageResponse findAllPostCommentsByPost(long postId, Map<String, String> params) {
        String path = String.format("%s/%d/%s", POSTS, postId, COMMENTS);

        return findAllPostComments(path, params);
    }

    private BasePostCommentPageResponse findAllPostComments(String path, Map<String, String> params) {
        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), path, params)
            .build()
            .toUri();

        return new HttpEndpoint(httpClient, uri).request(new TypeReference<>() {});
    }

    public BasePostCommentResponse createPostComment(long postId, String originalRequest) {
        String path = String.format("%s/%d/%s", POSTS, postId, COMMENTS);

        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), path)
            .build()
            .toUri();

        return new HttpEndpoint(httpClient, uri)
            .method("POST", originalRequest)
            .request(new TypeReference<>() {});
    }

    public BasePostCommentResponse updatePostComment(long id, String originalRequest) {
        String path = String.format("%s/%s/%d", POSTS, COMMENTS, id);

        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), path)
            .build()
            .toUri();

        return new HttpEndpoint(httpClient, uri)
            .method("PATCH", originalRequest)
            .request(new TypeReference<>() {});
    }

    public IdResponse removePostCommentById(long id) {
        String path = String.format("%s/%s/%d", POSTS, COMMENTS, id);

        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), path)
            .build()
            .toUri();

        return new HttpEndpoint(httpClient, uri)
            .method("DELETE")
            .request(new TypeReference<>() {});
    }

    public BasePostCommentTreeResponse getPostCommentTreeByParentId(long id) {
        String path = String.format("%s/%s", COMMENTS, id);

        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), path)
            .build()
            .toUri();

        return new HttpEndpoint(httpClient, uri).request(new TypeReference<>() {});
    }
}

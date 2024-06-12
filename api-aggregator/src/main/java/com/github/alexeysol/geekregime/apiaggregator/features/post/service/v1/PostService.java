package com.github.alexeysol.geekregime.apiaggregator.features.post.service.v1;

import com.fasterxml.jackson.core.type.TypeReference;
import com.github.alexeysol.geekregime.apiaggregator.shared.util.source.ApiPostsSource;
import com.github.alexeysol.geekregime.apicommons.exception.SerializedApiException;
import com.github.alexeysol.geekregime.apicommons.model.dto.post.PostDetailsDto;
import com.github.alexeysol.geekregime.apicommons.model.dto.post.PostPreviewDto;
import com.github.alexeysol.geekregime.apicommons.model.dto.shared.HasIdDto;
import com.github.alexeysol.geekregime.apicommons.model.util.BasicPage;
import com.github.alexeysol.geekregime.apicommons.util.http.Request;
import com.github.alexeysol.geekregime.apicommons.util.http.ResponseReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.net.http.HttpResponse;
import java.util.Optional;

import static com.github.alexeysol.geekregime.apiaggregator.shared.constant.PathConstant.*;
import static com.github.alexeysol.geekregime.apicommons.constant.ResourceConstant.*;

@Service
@RequiredArgsConstructor
public class PostService {
    private final ApiPostsSource source;

    public BasicPage<PostPreviewDto> findAllPosts(
        long authorId,
        Optional<String> paging,
        Optional<String> sortBy,
        Optional<String> searchBy
    ) {
        String path = String.format("%s/%d/%s", USERS, authorId, POSTS);

        return findAllPosts(path, paging, sortBy, searchBy);
    }

    public BasicPage<PostPreviewDto> findAllPosts(
        Optional<String> paging,
        Optional<String> sortBy,
        Optional<String> searchBy
    ) {
        return findAllPosts(POSTS, paging, sortBy, searchBy);
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
        String path = String.format("%s/%s", POSTS, slug);

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
        HttpResponse<String> response = new Request(getApiUrl(POSTS))
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
        String path = String.format("%s/%d", POSTS, id);

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
        String path = String.format("%s/%d", POSTS, id);

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
        return String.format("%s/%s/%s", source.getBaseUrl(), API_PREFIX_V1_EXTERNAL, path);
    }
}

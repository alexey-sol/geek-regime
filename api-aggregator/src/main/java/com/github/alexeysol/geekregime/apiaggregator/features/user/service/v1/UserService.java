package com.github.alexeysol.geekregime.apiaggregator.features.user.service.v1;

import com.fasterxml.jackson.core.type.TypeReference;
import com.github.alexeysol.geekregime.apiaggregator.shared.util.HttpEndpoint;
import com.github.alexeysol.geekregime.apiaggregator.shared.util.UriUtil;
import com.github.alexeysol.geekregime.apiaggregator.shared.util.source.ApiUsersSource;
import com.github.alexeysol.geekregime.apicommons.exception.SerializedApiError;
import com.github.alexeysol.geekregime.apicommons.generated.model.UserPageResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.net.http.HttpClient;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.github.alexeysol.geekregime.apicommons.constant.ResourceConstant.USERS;

@Service
@RequiredArgsConstructor
public class UserService {
    private static final String IDS_QUERY_PARAM_NAME = "ids";

    private final HttpClient httpClient;
    private final ApiUsersSource source;

    public List<UserResponse> findAllUsers(List<Long> ids) {
        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), USERS)
            .queryParam(IDS_QUERY_PARAM_NAME, ids)
            .build()
            .toUri();

        var page = new HttpEndpoint(httpClient, uri).request(new TypeReference<UserPageResponse>() {});
        return page.getContent();
    }

    public UserResponse findUserById(long id) {
        return findUserById(id, List.of());
    }

    public UserResponse findUserById(long id, List<HttpStatus> httpErrorStatusesToIgnore) {
        var path = String.format("%s/%s", USERS, id);

        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), path)
            .build()
            .toUri();

        try {
            return new HttpEndpoint(httpClient, uri).request(new TypeReference<>() {});
        } catch (SerializedApiError exception) {
            var apiError = new SerializedApiError.Builder(exception.getJson())
                .buildAll()
                .getResult();
            var isStatusToIgnore = toHttpStatusValues(httpErrorStatusesToIgnore).contains(apiError.getStatus());

            if (!isStatusToIgnore) {
                throw exception;
            }
        }

        return null;
    }

    private List<Integer> toHttpStatusValues(List<HttpStatus> httpStatuses) {
        return httpStatuses.stream().map(HttpStatus::value).toList();
    }

    public Map<Long, UserResponse> getMapAuthorIdToAuthor(List<Long> authorIds) {
        Map<Long, UserResponse> map = new HashMap<>();

        if (authorIds.isEmpty()) {
            return map;
        }

        List<UserResponse> authors = findAllUsers(authorIds);
        authors.forEach(author -> map.put(author.getId(), author));
        return map;
    }
}

package com.github.alexeysol.geekregime.apiaggregator.features.user.service.v1;

import com.fasterxml.jackson.core.type.TypeReference;
import com.github.alexeysol.geekregime.apiaggregator.shared.util.UriUtil;
import com.github.alexeysol.geekregime.apiaggregator.shared.util.source.ApiUsersSource;
import com.github.alexeysol.geekregime.apicommons.generated.model.UserPageResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.UserResponse;
import com.github.alexeysol.geekregime.apicommons.util.http.AppHttpClient;
import com.github.alexeysol.geekregime.apicommons.util.http.AppHttpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.github.alexeysol.geekregime.apicommons.constant.ResourceConstant.USERS;

@Service
@RequiredArgsConstructor
public class UserService {
    private static final String IDS_QUERY_PARAM_NAME = "ids";

    private final ApiUsersSource source;

    public List<UserResponse> findAllUsers(List<Long> ids) {
        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), USERS)
            .queryParam(IDS_QUERY_PARAM_NAME, ids)
            .build()
            .toUri();

        var request = AppHttpRequest.builder()
            .uri(uri)
            .GET()
            .build();

        var page = AppHttpClient.send(request, new TypeReference<UserPageResponse>() {});
        return page.getContent();
    }

    public UserResponse findUserById(long id) {
        var path = String.format("%s/%s", USERS, id);

        var uri = UriUtil.getApiUriBuilder(source.getBaseUrl(), path)
            .build()
            .toUri();

        var request = AppHttpRequest.builder()
            .uri(uri)
            .GET()
            .build();

        return AppHttpClient.send(request, new TypeReference<>() {});
    }
}

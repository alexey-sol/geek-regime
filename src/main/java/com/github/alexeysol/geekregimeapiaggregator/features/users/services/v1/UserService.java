package com.github.alexeysol.geekregimeapiaggregator.features.users.services.v1;

import com.fasterxml.jackson.core.type.TypeReference;
import com.github.alexeysol.geekregimeapiaggregator.shared.constants.PathConstants;
import com.github.alexeysol.geekregimeapiaggregator.shared.utils.sources.ApiUsersSource;
import com.github.alexeysol.geekregimeapicommons.exceptions.SerializedApiException;
import com.github.alexeysol.geekregimeapicommons.models.BasicPage;
import com.github.alexeysol.geekregimeapicommons.models.Pair;
import com.github.alexeysol.geekregimeapicommons.models.dtos.UserDto;
import com.github.alexeysol.geekregimeapicommons.utils.Json;
import com.github.alexeysol.geekregimeapicommons.utils.Request;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private String apiUsersBaseUrl = "";

    private final ApiUsersSource source;

    public UserService(ApiUsersSource source) {
        this.source = source;
    }

    public void setApiUsersUrl(String apiUsersBaseUrl) {
        this.apiUsersBaseUrl = apiUsersBaseUrl;
    }

    public List<UserDto> findAllUsers(List<Long> ids) {
            Request request = new Request(getApiUsersUrl());
            String idsAsString = Request.QueryUtils.toQueryListAsString(ids);
            String json = request.addQueryParams(new Pair<>("ids", idsAsString))
                .get()
                .getResult();

        try {
            Json.assertJsonIsNotApiException(json);
            BasicPage<UserDto> usersPage = Json.parse(json, new TypeReference<>() {});
            return usersPage.getContent();
        } catch (IllegalArgumentException exception) {
            throw new SerializedApiException(json);
        }
    }

    public UserDto findUserById(long id) {
        Request request = new Request(getApiUsersUrl());
        String json = request.addPathVariable(id)
            .get()
            .getResult();

        try {
            Json.assertJsonIsNotApiException(json);
            return Json.parse(json, UserDto.class);
        } catch (IllegalArgumentException exception) {
            throw new SerializedApiException(json);
        }
    }

    private String getApiUsersUrl() {
        String apiPath = source.getApiPath(PathConstants.V1);
        String baseUrl = (apiUsersBaseUrl.isEmpty())
            ? source.getBaseUrl()
            : apiUsersBaseUrl;

        return baseUrl + apiPath;
    }
}

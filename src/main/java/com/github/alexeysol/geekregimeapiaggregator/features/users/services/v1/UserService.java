package com.github.alexeysol.geekregimeapiaggregator.features.users.services.v1;

import com.fasterxml.jackson.core.type.TypeReference;
import com.github.alexeysol.geekregimeapiaggregator.shared.constants.PathConstants;
import com.github.alexeysol.geekregimeapiaggregator.shared.utils.sources.ApiUsersSource;
import com.github.alexeysol.geekregimeapicommons.exceptions.SerializedApiException;
import com.github.alexeysol.geekregimeapicommons.models.BasicPage;
import com.github.alexeysol.geekregimeapicommons.models.Pair;
import com.github.alexeysol.geekregimeapicommons.models.dtos.UserDto;
import com.github.alexeysol.geekregimeapicommons.utils.http.Request;
import com.github.alexeysol.geekregimeapicommons.utils.http.ResponseReader;
import org.springframework.stereotype.Service;

import java.net.http.HttpResponse;
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

        HttpResponse<String> response = request.addQueryParams(new Pair<>("ids", idsAsString))
            .get()
            .getResult();

        try {
            return new ResponseReader(response)
                .content(new TypeReference<BasicPage<UserDto>>() {})
                .getContent();
        } catch (IllegalArgumentException exception) {
            throw new SerializedApiException(response.body());
        }
    }

    public UserDto findUserById(long id) {
        Request request = new Request(getApiUsersUrl());
        HttpResponse<String> response = request.addPathVariable(id)
            .get()
            .getResult();

        try {
            return new ResponseReader(response).content(UserDto.class);
        } catch (IllegalArgumentException exception) {
            throw new SerializedApiException(response.body());
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

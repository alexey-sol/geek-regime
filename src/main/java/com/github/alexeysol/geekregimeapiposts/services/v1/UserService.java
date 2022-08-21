package com.github.alexeysol.geekregimeapiposts.services.v1;

import com.fasterxml.jackson.core.type.TypeReference;
import com.github.alexeysol.geekregimeapicommons.exceptions.BaseResourceException;
import com.github.alexeysol.geekregimeapicommons.utils.Json;
import com.github.alexeysol.geekregimeapicommons.utils.Request;
import com.github.alexeysol.geekregimeapiposts.sources.ApiUsersSourceResolver;
import com.github.alexeysol.geekregimeapiposts.constants.PathConstants;
import com.github.alexeysol.geekregimeapiposts.models.dtos.UserDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private String apiUsersBaseUrl = "";

    private final ApiUsersSourceResolver sourceResolver;

    public UserService(ApiUsersSourceResolver sourceResolver) {
        this.sourceResolver = sourceResolver;
    }

    public void setApiUsersUrl(String apiUsersBaseUrl) {
        this.apiUsersBaseUrl = apiUsersBaseUrl;
    }

    public List<UserDto> getAllUsers(List<Long> ids) {
        List<UserDto> users;

        try {
            Request request = new Request(getApiUsersUrl());
            String usersJson = request.addQueryParams(ids)
                .get()
                .getResult();

            users = Json.parse(usersJson, new TypeReference<>() {});
        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

        return users;
    }

    public UserDto getUser(long id) throws IllegalArgumentException, BaseResourceException {
        UserDto user;

        try {
            Request request = new Request(getApiUsersUrl());
            String userJson = request.addPathVariable(id)
                .get()
                .getResult();

            user = Json.parse(userJson, UserDto.class);
        } catch (IllegalArgumentException | BaseResourceException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

        return user;
    }

    private String getApiUsersUrl() {
        String apiPath = sourceResolver.getApiPath(PathConstants.V1);
        String baseUrl = (apiUsersBaseUrl.isEmpty())
            ? sourceResolver.getBaseUrl()
            : apiUsersBaseUrl;

        return baseUrl + apiPath;
    }
}

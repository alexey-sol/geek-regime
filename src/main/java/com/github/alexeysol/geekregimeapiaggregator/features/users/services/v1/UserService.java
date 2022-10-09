package com.github.alexeysol.geekregimeapiaggregator.features.users.services.v1;

import com.fasterxml.jackson.core.type.TypeReference;
import com.github.alexeysol.geekregimeapiaggregator.shared.constants.PathConstants;
import com.github.alexeysol.geekregimeapiaggregator.shared.utils.sources.ApiUsersSourceResolver;
import com.github.alexeysol.geekregimeapicommons.exceptions.BaseResourceException;
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

    private final ApiUsersSourceResolver sourceResolver;

    public UserService(ApiUsersSourceResolver sourceResolver) {
        this.sourceResolver = sourceResolver;
    }

    public void setApiUsersUrl(String apiUsersBaseUrl) {
        this.apiUsersBaseUrl = apiUsersBaseUrl;
    }

    public List<UserDto> findAllUsers(List<Long> ids) {
        List<UserDto> users;

        try {
            Request request = new Request(getApiUsersUrl());

            String idsAsString = Request.QueryUtils.toQueryListAsString(ids);
            String usersPageJson = request.addQueryParams(new Pair<>("ids", idsAsString))
                .get()
                .getResult();

            BasicPage<UserDto> usersPage = Json.parse(usersPageJson, new TypeReference<>() {});
            users = usersPage.getContent();
        } catch (IllegalArgumentException exception) {
            throw exception;
        } catch (Exception exception) {
            throw new RuntimeException(exception.getMessage());
        }

        return users;
    }

    public UserDto findUserById(long id) throws IllegalArgumentException, BaseResourceException {
        UserDto user;

        try {
            Request request = new Request(getApiUsersUrl());
            String userJson = request.addPathVariable(id)
                .get()
                .getResult();

            user = Json.parse(userJson, UserDto.class);
        } catch (IllegalArgumentException | BaseResourceException exception) {
            throw exception;
        } catch (Exception exception) {
            throw new RuntimeException(exception.getMessage());
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

package com.github.alexeysol.geekregimeapiposts.services.v1;

import com.fasterxml.jackson.core.type.TypeReference;
import com.github.alexeysol.geekregimeapicommons.exceptions.BaseApiPostsException;
import com.github.alexeysol.geekregimeapicommons.utils.Json;
import com.github.alexeysol.geekregimeapicommons.utils.Request;
import com.github.alexeysol.geekregimeapiposts.ApiUsersSourceResolver;
import com.github.alexeysol.geekregimeapiposts.models.mappers.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final ApiUsersSourceResolver sourceResolver;

    public UserService(ApiUsersSourceResolver sourceResolver) {
        this.sourceResolver = sourceResolver;
    }

    public List<User> getAllUsers(List<Long> ids) {
        List<User> users;

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

    public User getUser(long id) throws IllegalArgumentException, BaseApiPostsException {
        User user;

        try {
            Request request = new Request(getApiUsersUrl());
            String userJson = request.addPathVariable(id)
                .get()
                .getResult();

            user = Json.parse(userJson, User.class);
        } catch (IllegalArgumentException | BaseApiPostsException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

        return user;
    }

    private String getApiUsersUrl() {
        return getApiUsersUrl(1);
    }

    private String getApiUsersUrl(int apiVersion) {
        String baseUrl = sourceResolver.getBaseUrl();
        String apiPath = sourceResolver.getApiPath(apiVersion);
        return String.format("%s/%s", baseUrl, apiPath);
    }
}

package com.github.alexeysol.geekregimeapiposts.services.v1;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.alexeysol.geekregimeapiposts.ApiUsersSourceResolver;
import com.github.alexeysol.geekregimeapiposts.mappers.User;
import com.github.alexeysol.geekregimeapiposts.utils.Request;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final ApiUsersSourceResolver sourceResolver;

    public UserService(ApiUsersSourceResolver sourceResolver) {
        this.sourceResolver = sourceResolver;
    }

    public List<User> getAllUsers(List<Integer> ids) {
        List<User> users;

        try {
            Request request = new Request(getApiUsersUrl());
            String usersJson = request.addIntegerQueryParams(ids)
                .get()
                .getResult();
            ObjectMapper mapper = new ObjectMapper();
            users = mapper.readValue(usersJson, new TypeReference<>() {});
        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

        return users;
    }

    public User getUser(int id) {
        User user;

        try {
            Request request = new Request(getApiUsersUrl());
            String userJson = request.addPathVariable(id)
                .get()
                .getResult();
            ObjectMapper mapper = new ObjectMapper();
            user = mapper.readValue(userJson, User.class);
        } catch (IllegalArgumentException e) {
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

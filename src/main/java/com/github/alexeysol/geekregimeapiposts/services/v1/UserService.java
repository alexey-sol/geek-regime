package com.github.alexeysol.geekregimeapiposts.services.v1;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.alexeysol.geekregimeapiposts.ApiUsersSourceResolver;
import com.github.alexeysol.geekregimeapiposts.mappers.User;
import com.github.alexeysol.geekregimeapiposts.utils.Request;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final ApiUsersSourceResolver sourceResolver;

    public UserService(ApiUsersSourceResolver sourceResolver) {
        this.sourceResolver = sourceResolver;
    }

    public User getUser(int id) {
        String apiUsersUrl = getApiUsersUrl();
        String getUserUrl = String.format("%s/%d", apiUsersUrl, id);
        User user = null;

        try {
            String userJson = Request.get(getUserUrl);
            ObjectMapper mapper = new ObjectMapper();
            user = mapper.readValue(userJson, User.class);
        } catch (Exception e) {
            e.printStackTrace();
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

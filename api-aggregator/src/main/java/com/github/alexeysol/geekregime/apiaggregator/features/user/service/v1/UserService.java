package com.github.alexeysol.geekregime.apiaggregator.features.user.service.v1;

import com.fasterxml.jackson.core.type.TypeReference;
import com.github.alexeysol.geekregime.apiaggregator.shared.util.source.ApiUsersSource;
import com.github.alexeysol.geekregime.apicommons.exception.SerializedApiException;
import com.github.alexeysol.geekregime.apicommons.model.dto.user.UserDto;
import com.github.alexeysol.geekregime.apicommons.model.util.BasicPage;
import com.github.alexeysol.geekregime.apicommons.util.http.Request;
import com.github.alexeysol.geekregime.apicommons.util.http.ResponseReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.net.http.HttpResponse;
import java.util.List;

import static com.github.alexeysol.geekregime.apiaggregator.shared.constant.PathConstant.*;
import static com.github.alexeysol.geekregime.apicommons.constant.ResourceConstant.USERS;

@Service
@RequiredArgsConstructor
public class UserService {
    private final ApiUsersSource source;

    public List<UserDto> findAllUsers(List<Long> ids) {
        Request request = new Request(getApiUrl(USERS));

        HttpResponse<String> response = request.addQueryParam("ids", ids)
            .GET()
            .send()
            .join();

        try {
            return new ResponseReader(response)
                .content(new TypeReference<BasicPage<UserDto>>() {})
                .getContent();
        } catch (IllegalArgumentException exception) {
            throw new SerializedApiException(response.body());
        }
    }

    public UserDto findUserById(long id) {
        String path = String.format("%s/%d", USERS, id);
        Request request = new Request(getApiUrl(path));

        HttpResponse<String> response = request.GET()
            .send()
            .join();

        try {
            return new ResponseReader(response).content(UserDto.class);
        } catch (IllegalArgumentException exception) {
            throw new SerializedApiException(response.body());
        }
    }

    private String getApiUrl(String path) {
        return String.format("%s/%s/%s", source.getBaseUrl(), API_PREFIX_V1_EXTERNAL, path);
    }
}

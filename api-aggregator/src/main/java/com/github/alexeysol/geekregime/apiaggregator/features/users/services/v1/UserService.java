package com.github.alexeysol.geekregime.apiaggregator.features.users.services.v1;

import com.fasterxml.jackson.core.type.TypeReference;
import com.github.alexeysol.geekregime.apiaggregator.shared.constants.PathConstants;
import com.github.alexeysol.geekregime.apiaggregator.shared.utils.sources.ApiUsersSource;
import com.github.alexeysol.geekregime.apicommons.exceptions.SerializedApiException;
import com.github.alexeysol.geekregime.apicommons.models.dtos.users.UserDto;
import com.github.alexeysol.geekregime.apicommons.models.utils.BasicPage;
import com.github.alexeysol.geekregime.apicommons.utils.http.Request;
import com.github.alexeysol.geekregime.apicommons.utils.http.ResponseReader;
import org.springframework.stereotype.Service;

import java.net.http.HttpResponse;
import java.util.List;

@Service
public class UserService {
    private final ApiUsersSource source;

    public UserService(ApiUsersSource source) {
        this.source = source;
    }

    public List<UserDto> findAllUsers(List<Long> ids) {
        String path = String.format("/%s", source.getResource());

        Request request = new Request(getApiUrl(path));

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
        String path = String.format("/%s/%d", source.getResource(), id);

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
        String apiPath = source.getApiPath(PathConstants.V1);
        return source.getBaseUrl() + apiPath + path;
    }
}

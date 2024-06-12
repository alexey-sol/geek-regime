package com.github.alexeysol.geekregime.apiaggregator.features.user.service.v1.userservice;

import com.github.alexeysol.geekregime.apicommons.exception.SerializedApiException;
import com.github.alexeysol.geekregime.apicommons.model.dto.user.UserDto;
import com.github.tomakehurst.wiremock.client.ResponseDefinitionBuilder;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import static com.github.tomakehurst.wiremock.client.WireMock.*;

public class FindUserByIdTest extends BaseUserServiceTest {
    @Test
    public void userExists_whenFindUserById_thenReturnsUser() {
        long userId = 1L;
        String path = String.format("%s/%d", API_USERS_PATH, userId);

        ResponseDefinitionBuilder responseToReturn = aResponse()
            .withStatus(HttpStatus.OK.value())
            .withBodyFile(getJsonPath("getUser", HttpStatus.OK));

        wireMockServer.stubFor(getApiMappingBuilder(path, responseToReturn));

        UserDto user = service.findUserById(userId);

        wireMockServer.verify(getRequestedFor(urlPathEqualTo(path))
            .withHeader("Content-Type", equalTo("application/json")));

        Assertions.assertNotNull(user);
        Assertions.assertEquals(userId, user.getId());
    }

    @Test
    public void userDoesntExist_whenFindUserById_thenReturnsStatus404() {
        long absentId = 10L;
        String path = String.format("%s/%d", API_USERS_PATH, absentId);

        ResponseDefinitionBuilder responseToReturn = aResponse()
            .withStatus(HttpStatus.NOT_FOUND.value())
            .withBodyFile(getJsonPath("getUser", HttpStatus.NOT_FOUND));

        wireMockServer.stubFor(getApiMappingBuilder(path, responseToReturn));

        Assertions.assertThrows(
            SerializedApiException.class, () -> service.findUserById(absentId)
        );

        wireMockServer.verify(getRequestedFor(urlPathEqualTo(path))
            .withHeader("Content-Type", equalTo("application/json")));
    }
}

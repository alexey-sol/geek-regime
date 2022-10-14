package com.github.alexeysol.geekregimeapiaggregator.features.users.services.v1.userservice;

import com.github.alexeysol.geekregimeapiaggregator.shared.utils.sources.ApiUsersSource;
import com.github.alexeysol.geekregimeapicommons.exceptions.SerializedApiException;
import com.github.alexeysol.geekregimeapicommons.models.dtos.UserDto;
import com.github.tomakehurst.wiremock.client.ResponseDefinitionBuilder;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import static com.github.tomakehurst.wiremock.client.WireMock.*;

public class FindUserByIdTest extends BaseUserServiceTest {
    public FindUserByIdTest(@Autowired ApiUsersSource source) {
        super(source);
    }

    @Test
    public void userExists_whenFindUserById_thenReturnsUser() {
        long userId = 1L;

        ResponseDefinitionBuilder responseToReturn = aResponse()
            .withStatus(HttpStatus.OK.value())
            .withBodyFile(getJsonPath("getUser", HttpStatus.OK));

        wireMockServer.stubFor(getApiUsersMappingBuilder(responseToReturn, userId));

        UserDto user = service.findUserById(userId);

        wireMockServer.verify(getRequestedFor(urlPathEqualTo(getEndpoint(userId)))
            .withHeader("Content-Type", equalTo("application/json")));

        Assertions.assertNotNull(user);
        Assertions.assertEquals(userId, user.getId());
    }

    @Test
    public void userDoesntExist_whenFindUserById_thenReturnsStatus404() {
        long absentId = 10L;

        ResponseDefinitionBuilder responseToReturn = aResponse()
            .withStatus(HttpStatus.NOT_FOUND.value())
            .withBodyFile(getJsonPath("getUser", HttpStatus.NOT_FOUND));

        wireMockServer.stubFor(getApiUsersMappingBuilder(responseToReturn, absentId));

        Assertions.assertThrows(
            SerializedApiException.class, () -> service.findUserById(absentId)
        );

        wireMockServer.verify(getRequestedFor(urlPathEqualTo(getEndpoint(absentId)))
            .withHeader("Content-Type", equalTo("application/json")));
    }
}

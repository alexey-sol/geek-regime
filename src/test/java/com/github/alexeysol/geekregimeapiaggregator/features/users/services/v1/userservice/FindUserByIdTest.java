package com.github.alexeysol.geekregimeapiaggregator.features.users.services.v1.userservice;

import com.github.alexeysol.geekregimeapiaggregator.shared.utils.sources.ApiUsersSourceResolver;
import com.github.alexeysol.geekregimeapicommons.models.dtos.UserDto;
import com.github.tomakehurst.wiremock.client.ResponseDefinitionBuilder;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import static com.github.tomakehurst.wiremock.client.WireMock.*;

public class FindUserByIdTest extends BaseUserServiceTest {
    public FindUserByIdTest(
        @Autowired ApiUsersSourceResolver apiUsersSourceResolver
    ) {
        super(apiUsersSourceResolver);
    }

    @Test
    public void userExists_whenFindUserById_thenReturnsUser() {
        long userId = 1L;

        ResponseDefinitionBuilder responseToReturn = aResponse()
            .withBodyFile(getJsonPath("getUser", HttpStatus.OK));

        wireMockServer.stubFor(getApiUsersMappingBuilder(responseToReturn, userId));

        UserDto user = userService.findUserById(userId);

        wireMockServer.verify(getRequestedFor(urlPathEqualTo(getEndpoint(userId)))
            .withHeader("Content-Type", equalTo("application/json")));

        Assertions.assertNotNull(user);
        Assertions.assertEquals(userId, user.getId());
    }

    @Test
    public void userDoesntExist_whenFindUserById_thenReturnsStatus404() {
        long absentId = 10L;

        ResponseDefinitionBuilder responseToReturn = aResponse()
            .withBodyFile(getJsonPath("getUser", HttpStatus.NOT_FOUND));

        wireMockServer.stubFor(getApiUsersMappingBuilder(responseToReturn, absentId));

        ResponseStatusException exception = Assertions.assertThrows(
            ResponseStatusException.class, () -> userService.findUserById(absentId)
        );

        wireMockServer.verify(getRequestedFor(urlPathEqualTo(getEndpoint(absentId)))
            .withHeader("Content-Type", equalTo("application/json")));
    }
}

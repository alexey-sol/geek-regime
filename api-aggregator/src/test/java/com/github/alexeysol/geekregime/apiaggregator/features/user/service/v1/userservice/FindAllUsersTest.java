package com.github.alexeysol.geekregime.apiaggregator.features.user.service.v1.userservice;

import com.github.tomakehurst.wiremock.client.ResponseDefinitionBuilder;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import java.util.List;

import static com.github.tomakehurst.wiremock.client.WireMock.*;

public class FindAllUsersTest extends BaseUserServiceTest {
    @Test
    public void usersExist_whenFindAllUsers_thenReturnsUserResponseList() {
        long userId = 1L;
        long userId2 = 2L;

        ResponseDefinitionBuilder responseToReturn = aResponse()
            .withStatus(HttpStatus.OK.value())
            .withBodyFile(getJsonPath("getAllUsers", HttpStatus.OK));

        wireMockServer.stubFor(getApiMappingBuilder(API_USERS_PATH, responseToReturn));

        List<Long> ids = List.of(userId, userId2);
        var users = service.findAllUsers(ids);

        wireMockServer.verify(getRequestedFor(urlPathEqualTo(API_USERS_PATH))
            .withHeader("Content-Type", equalTo("application/json")));

        int expectedListSize = 2;
        Assertions.assertEquals(expectedListSize, users.size());
        Assertions.assertEquals(userId, users.get(0).getId());
        Assertions.assertEquals(userId2, users.get(1).getId());
    }
}

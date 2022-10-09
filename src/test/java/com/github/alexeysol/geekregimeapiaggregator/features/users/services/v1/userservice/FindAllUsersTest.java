package com.github.alexeysol.geekregimeapiaggregator.features.users.services.v1.userservice;

import com.github.alexeysol.geekregimeapiaggregator.shared.utils.sources.ApiUsersSourceResolver;
import com.github.alexeysol.geekregimeapicommons.models.dtos.UserDto;
import com.github.tomakehurst.wiremock.client.ResponseDefinitionBuilder;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.util.List;

import static com.github.tomakehurst.wiremock.client.WireMock.*;

public class FindAllUsersTest extends BaseUserServiceTest {
    public FindAllUsersTest(
        @Autowired ApiUsersSourceResolver apiUsersSourceResolver
    ) {
        super(apiUsersSourceResolver);
    }

    @Test
    public void usersExist_whenFindAllUsers_thenReturnsUserList() {
        long userId1 = 1L;
        long userId2 = 2L;

        ResponseDefinitionBuilder responseToReturn = aResponse()
            .withBodyFile(getJsonPath("getAllUsers", HttpStatus.OK));

        wireMockServer.stubFor(getApiUsersMappingBuilder(responseToReturn));

        List<Long> ids = List.of(userId1, userId2);
        List<UserDto> users = userService.findAllUsers(ids);

        wireMockServer.verify(getRequestedFor(urlPathEqualTo(getEndpoint()))
            .withHeader("Content-Type", equalTo("application/json")));

        int expectedListSize = 2;
        Assertions.assertEquals(expectedListSize, users.size());
        Assertions.assertEquals(userId1, users.get(0).getId());
        Assertions.assertEquals(userId2, users.get(1).getId());
    }
}

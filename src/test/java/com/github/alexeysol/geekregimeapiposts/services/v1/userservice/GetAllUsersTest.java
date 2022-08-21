package com.github.alexeysol.geekregimeapiposts.services.v1.userservice;

import com.github.alexeysol.geekregimeapiposts.models.dtos.UserDto;
import com.github.alexeysol.geekregimeapiposts.sources.ApiUsersSourceResolver;
import com.github.tomakehurst.wiremock.client.ResponseDefinitionBuilder;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.util.List;

import static com.github.tomakehurst.wiremock.client.WireMock.*;

public class GetAllUsersTest extends BaseUserServiceTest {
    private final long userId1 = 1L;
    private final long userId2 = 2L;

    public GetAllUsersTest(
        @Autowired ApiUsersSourceResolver apiUsersSourceResolver
    ) {
        super(apiUsersSourceResolver);
    }

    @Test
    public void usersExist_whenGetAllUsers_thenReturnsUserList() {
        ResponseDefinitionBuilder responseToReturn = aResponse()
            .withBodyFile(getJsonPath("getAllUsers", HttpStatus.OK));

        wireMockServer.stubFor(getApiUsersMappingBuilder(responseToReturn));

        List<Long> ids = List.of(userId1, userId2);
        List<UserDto> users = userService.getAllUsers(ids);

        wireMockServer.verify(getRequestedFor(urlPathEqualTo(getEndpoint()))
            .withHeader("Content-Type", equalTo("application/json")));

        int expectedListSize = 2;
        Assertions.assertEquals(expectedListSize, users.size());
        Assertions.assertEquals(userId1, users.get(0).getId());
        Assertions.assertEquals(userId2, users.get(1).getId());
    }
}

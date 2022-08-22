package com.github.alexeysol.geekregimeapiposts.services.v1.userservice;

import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceNotFoundException;
import com.github.alexeysol.geekregimeapiposts.models.dtos.UserDto;
import com.github.alexeysol.geekregimeapiposts.utils.sources.ApiUsersSourceResolver;
import com.github.tomakehurst.wiremock.client.ResponseDefinitionBuilder;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

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

        ResourceNotFoundException exception = Assertions.assertThrows(
            ResourceNotFoundException.class, () -> userService.findUserById(absentId)
        );

        String expectedMessage = "USER/NOT_FOUND/id=10";
        Assertions.assertEquals(expectedMessage, exception.getMessage());

        wireMockServer.verify(getRequestedFor(urlPathEqualTo(getEndpoint(absentId)))
            .withHeader("Content-Type", equalTo("application/json")));
    }
}

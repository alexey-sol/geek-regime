package com.github.alexeysol.geekregimeapiposts.services.v1.userservice;

import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceNotFoundException;
import com.github.alexeysol.geekregimeapiposts.models.mappers.User;
import com.github.alexeysol.geekregimeapiposts.sources.ApiUsersSourceResolver;
import com.github.tomakehurst.wiremock.client.ResponseDefinitionBuilder;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import static com.github.tomakehurst.wiremock.client.WireMock.*;

public class GetUserTest extends BaseUserServiceTest {
    public GetUserTest(
        @Autowired ApiUsersSourceResolver apiUsersSourceResolver
    ) {
        super(apiUsersSourceResolver);
    }

    @Test
    public void userExists_whenGetUser_thenReturnsUser() {
        long id = 1L;

        ResponseDefinitionBuilder responseToReturn = aResponse()
            .withBodyFile(getJsonPath("getUser", HttpStatus.OK));

        wireMockServer.stubFor(getApiUsersMappingBuilder(responseToReturn, id));

        User user = userService.getUser(id);

        wireMockServer.verify(getRequestedFor(urlPathEqualTo(getEndpoint(id)))
            .withHeader("Content-Type", equalTo("application/json")));

        Assertions.assertNotNull(user);
        Assertions.assertEquals(id, user.getId());
    }

    @Test
    public void userDoesntExist_whenGetUser_thenReturnsStatus404() {
        long absentId = 10L;

        ResponseDefinitionBuilder responseToReturn = aResponse()
            .withBodyFile(getJsonPath("getUser", HttpStatus.NOT_FOUND));

        wireMockServer.stubFor(getApiUsersMappingBuilder(responseToReturn, absentId));

        ResourceNotFoundException exception = Assertions.assertThrows(
            ResourceNotFoundException.class, () -> userService.getUser(absentId)
        );

        String expectedMessage = "USER/NOT_FOUND/id=10";
        Assertions.assertEquals(expectedMessage, exception.getMessage());

        wireMockServer.verify(getRequestedFor(urlPathEqualTo(getEndpoint(absentId)))
            .withHeader("Content-Type", equalTo("application/json")));
    }
}

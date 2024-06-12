package com.github.alexeysol.geekregime.apiaggregator.features.user.service.v1.userservice;

import com.github.alexeysol.geekregime.apiaggregator.features.user.service.v1.UserService;
import com.github.alexeysol.geekregime.apiaggregator.shared.util.source.ApiUsersSource;
import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.client.MappingBuilder;
import com.github.tomakehurst.wiremock.client.ResponseDefinitionBuilder;
import com.github.tomakehurst.wiremock.client.WireMock;
import com.github.tomakehurst.wiremock.core.WireMockConfiguration;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.http.HttpStatus;

import static com.github.tomakehurst.wiremock.client.WireMock.*;
import static org.mockito.Mockito.when;

@SpringBootTest
public abstract class BaseUserServiceTest {
    private static final String HOST = "http://localhost";
    protected static final String API_USERS_PATH = "/api/v1/users";

    static WireMockServer wireMockServer = new WireMockServer();

    @SpyBean
    protected ApiUsersSource source;

    @SpyBean
    protected UserService service;

    @BeforeAll
    public static void beforeAll() {
        WireMockConfiguration wireMockConfig = WireMockConfiguration.wireMockConfig().dynamicPort();
        wireMockServer = new WireMockServer(wireMockConfig);
        wireMockServer.start();
        WireMock.configureFor(HOST, wireMockServer.port());
    }

    @BeforeEach
    public void beforeEach() {
        String baseUrl = String.format("%s:%d", HOST, wireMockServer.port());
        when(source.getBaseUrl()).thenReturn(baseUrl);
    }

    @AfterAll
    public static void afterAll() {
        wireMockServer.stop();
    }

    @AfterEach
    public void afterEach() {
        wireMockServer.resetAll();
    }

    protected String getJsonPath(String methodName, HttpStatus httpStatus) {
        String jsonPathTemplate = "features/users/services/v1/userservice/%s/%d.json";
        return String.format(jsonPathTemplate, methodName.toLowerCase(), httpStatus.value());
    }

    protected MappingBuilder getApiMappingBuilder(
        String path,
        ResponseDefinitionBuilder responseToReturn
    ) {
        return get(urlPathEqualTo(path))
            .withHeader("Content-Type", containing("application/json"))
            .willReturn(responseToReturn);
    }
}

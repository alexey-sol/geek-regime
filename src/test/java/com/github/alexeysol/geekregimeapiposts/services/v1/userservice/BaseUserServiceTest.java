package com.github.alexeysol.geekregimeapiposts.services.v1.userservice;

import com.github.alexeysol.geekregimeapiposts.constants.PathConstants;
import com.github.alexeysol.geekregimeapiposts.services.v1.UserService;
import com.github.alexeysol.geekregimeapiposts.utils.sources.ApiUsersSourceResolver;
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

@SpringBootTest
public abstract class BaseUserServiceTest {
    private final static String HOST = "localhost";
    static WireMockServer wireMockServer = new WireMockServer();

    private String apiV1Path;
    protected ApiUsersSourceResolver apiUsersSourceResolver;

    @SpyBean
    protected UserService userService;

    @BeforeAll
    public static void beforeAll() {
        WireMockConfiguration wireMockConfig = WireMockConfiguration.wireMockConfig().dynamicPort();
        wireMockServer = new WireMockServer(wireMockConfig);
        wireMockServer.start();
        WireMock.configureFor(HOST, wireMockServer.port());

    }

    @BeforeEach
    public void beforeEach() {
        userService.setApiUsersUrl(getTestBaseUrl());
    }

    @AfterAll
    public static void afterAll() {
        wireMockServer.stop();
    }

    @AfterEach
    public void afterEach() {
        wireMockServer.resetAll();
    }

    public BaseUserServiceTest(
        ApiUsersSourceResolver apiUsersSourceResolver
    ) {
        this.apiUsersSourceResolver = apiUsersSourceResolver;
        this.apiV1Path = apiUsersSourceResolver.getApiPath(PathConstants.V1);
    }

    protected String getTestBaseUrl() {
        int port = wireMockServer.port();
        return String.format(PathConstants.BASE_URL_TEMPLATE, HOST, port);
    }

    protected String getEndpoint() {
        return getEndpoint("");
    }

    protected String getEndpoint(long pathVariable) {
        return getEndpoint(String.valueOf(pathVariable));
    }

    protected String getEndpoint(String pathVariable) {
        return (pathVariable.isEmpty())
            ? apiV1Path
            : String.format("%s/%s", apiV1Path, pathVariable);
    }

    protected String getJsonPath(String methodName, HttpStatus httpStatus) {
        String jsonPathTemplate = "services/v1/userservice/%s/%d.json";
        return String.format(jsonPathTemplate, methodName.toLowerCase(), httpStatus.value());
    }

    protected MappingBuilder getApiUsersMappingBuilder(ResponseDefinitionBuilder response) {
        return getApiUsersMappingBuilder(response, "");
    }

    protected MappingBuilder getApiUsersMappingBuilder(
        ResponseDefinitionBuilder response,
        long pathVariable
    ) {
        return getApiUsersMappingBuilder(response, String.valueOf(pathVariable));
    }

    protected MappingBuilder getApiUsersMappingBuilder(
        ResponseDefinitionBuilder response,
        String pathVariable
    ) {
        String url = (pathVariable.isEmpty())
            ? apiV1Path
            : String.format("%s/%s", apiV1Path, pathVariable);

        return get(urlPathEqualTo(url))
            .withHeader("Content-Type", containing("application/json"))
            .willReturn(response);
    }
}

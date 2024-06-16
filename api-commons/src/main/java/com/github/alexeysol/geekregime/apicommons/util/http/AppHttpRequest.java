package com.github.alexeysol.geekregime.apicommons.util.http;

import lombok.experimental.UtilityClass;

import java.net.http.HttpRequest;
import java.time.Duration;

import static java.time.temporal.ChronoUnit.SECONDS;

@UtilityClass
public class AppHttpRequest {
    private static final int TIMEOUT_SEC = 10;
    private static final String CONTENT_TYPE_KEY = "Content-Type";
    private static final String CONTENT_TYPE_VALUE = "application/json";

    public HttpRequest.Builder builder() {
        return HttpRequest.newBuilder()
            .timeout(Duration.of(TIMEOUT_SEC, SECONDS))
            .header(CONTENT_TYPE_KEY, CONTENT_TYPE_VALUE);
    }
}

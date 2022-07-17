package com.github.alexeysol.geekregimeapiposts.utils;

import org.springframework.util.Assert;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import static java.time.temporal.ChronoUnit.SECONDS;

public class Request {
    private final int TIMEOUT_IN_SEC = 10;
    private final String CONTENT_TYPE = "application/json";

    private String url;
    private HttpRequest httpRequest = null;
    private boolean hasQueryParams = false;

    public Request(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public Request get() throws URISyntaxException {
        httpRequest = HttpRequest.newBuilder()
            .uri(new URI(url))
            .header("Content-Type", CONTENT_TYPE)
            .timeout(Duration.of(TIMEOUT_IN_SEC, SECONDS))
            .GET()
            .build();

        return this;
    }

    public String getResult() throws InterruptedException, ExecutionException {
        Assert.notNull(httpRequest, "No request made; make request first");

        CompletableFuture<HttpResponse<String>> response = HttpClient.newBuilder()
            .build()
            .sendAsync(httpRequest, HttpResponse.BodyHandlers.ofString());

        return response.get().body();
    }

    public Request addPathVariable(long pathVariable) {
        return addPathVariable(String.valueOf(pathVariable));
    }

    public Request addPathVariable(String pathVariable) {
        Assert.isNull(httpRequest, "Request is already done; add path variable before making request");
        Assert.isTrue(!hasQueryParams, "URI already has query params in it; add path variable first");

        String path = String.format("/%s", pathVariable);
        url += path;
        return this;
    }

    public Request addQueryParams(List<?> items) {
        Assert.isNull(httpRequest, "Request is already done; add query params before making request");

        List<String> stringifiedItems = new ArrayList<>();

        for (Object item : items) {
            stringifiedItems.add(String.valueOf(item));
        }

        String queryParams = getQueryParams(stringifiedItems);
        url += queryParams;

        return this;
    }

    private String getQueryParams(List<String> items) {
        StringBuilder queryParams = new StringBuilder();

        for (String item : items) {
            char separator = (hasQueryParams) ? '&' : '?';
            queryParams.append(separator);
            queryParams.append(item);
            hasQueryParams = true;
        }

        return queryParams.toString();
    }
}

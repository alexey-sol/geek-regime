package com.github.alexeysol.geekregime.apicommons.util.http;

import com.github.alexeysol.geekregime.apicommons.util.converter.HttpQueryConverter;
import org.springframework.util.Assert;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import static java.time.temporal.ChronoUnit.SECONDS;

public class Request {
    private String url;
    private HttpRequest httpRequest;
    private boolean hasQueryParams = false;

    public Request(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public Request GET() {
        return method("GET");
    }

    public Request DELETE() {
        return method("DELETE");
    }

    public Request POST() {
        return POST("");
    }

    public Request POST(String body) {
        return method("POST", body);
    }

    public Request PATCH() {
        return PATCH("");
    }

    public Request PATCH(String body) {
        return method("PATCH", body);
    }

    private Request method(String method) {
        return method(method, "");
    }

    private Request method(String method, String body) {
        httpRequest = buildRequest()
            .method(method, getBodyPublisher(body))
            .build();

        return this;
    }

    private HttpRequest.Builder buildRequest() {
        final int TIMEOUT_IN_SEC = 10;
        final String CONTENT_TYPE = "application/json";

        try {

            return HttpRequest.newBuilder()
                .uri(new URI(url))
                .header("Content-Type", CONTENT_TYPE)
                .timeout(Duration.of(TIMEOUT_IN_SEC, SECONDS));
        } catch (URISyntaxException exception) {
            throw new RuntimeException(exception);
        }
    }

    private HttpRequest.BodyPublisher getBodyPublisher(String body) {
        return (body.isEmpty())
            ? HttpRequest.BodyPublishers.noBody()
            : HttpRequest.BodyPublishers.ofString(body);
    }

    public CompletableFuture<HttpResponse<String>> send() {
        Assert.notNull(httpRequest, "No built request; build request first");

        return HttpClient.newBuilder()
            .build()
            .sendAsync(httpRequest, HttpResponse.BodyHandlers.ofString());
    }

    public Request addPathSegment(long segment) {
        return addPathSegment(String.valueOf(segment));
    }

    public Request addPathSegment(String segment) {
        Assert.isNull(httpRequest, "Request is already built; add path segment before making request");
        Assert.isTrue(!hasQueryParams, "URI already has query params in it; add path segment first");

        String path = String.format("/%s", segment);
        url += path;

        return this;
    }

    public Request addQueryParam(String key, List<?> value) {
        String valueAsQueryString = HttpQueryConverter.toListAsString(value);
        return addQueryParam(key, valueAsQueryString);
    }

    public Request addQueryParam(String key, long value) {
        String valueAsString = String.valueOf(value);
        return addQueryParam(key, valueAsString);
    }

    public Request addQueryParam(String key, String value) {
        Assert.isNull(httpRequest, "Request is already built; add query params before making request");

        url += getQueryParam(key, value);
        return this;
    }

    private String getQueryParam(String key, String value) {
        String queryParam = HttpQueryConverter.toParam(key, value, hasQueryParams);
        hasQueryParams = true;
        return queryParam;
    }
}

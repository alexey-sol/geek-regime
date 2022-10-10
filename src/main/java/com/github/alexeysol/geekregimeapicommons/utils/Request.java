package com.github.alexeysol.geekregimeapicommons.utils;

import com.github.alexeysol.geekregimeapicommons.models.Pair;
import org.springframework.util.Assert;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
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

    public Request get() {
        httpRequest = buildRequest().GET().build();
        return this;
    }

    public Request delete() {
        httpRequest = buildRequest().DELETE().build();
        return this;
    }

    public Request post() {
        return post("");
    }

    public Request post(String body) {
        return method("POST", body);
    }

    public Request patch() {
        return patch("");
    }

    public Request patch(String body) {
        return method("PATCH", body);
    }

    private Request method(String method, String body) {
        httpRequest = buildRequest()
            .method(method, getBodyPublisher(body))
            .build();

        return this;
    }

    private HttpRequest.Builder buildRequest() {
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

    public String getResult() {
        try {
            Assert.notNull(httpRequest, "No built request; build request first");

            CompletableFuture<HttpResponse<String>> response = HttpClient.newBuilder()
                .build()
                .sendAsync(httpRequest, HttpResponse.BodyHandlers.ofString());

            return response.get().body();
        } catch (InterruptedException | ExecutionException exception) {
            throw new RuntimeException(exception);
        }
    }

    public Request addPathVariable(long pathVariable) {
        return addPathVariable(String.valueOf(pathVariable));
    }

    public Request addPathVariable(String pathVariable) {
        Assert.isNull(httpRequest, "Request is already built; add path variable before making request");
        Assert.isTrue(!hasQueryParams, "URI already has query params in it; add path variable first");

        String path = String.format("/%s", pathVariable);
        url += path;

        return this;
    }

    public Request addQueryParams(Pair<String, ?> keyValuePair) {
        Assert.isNull(httpRequest, "Request is already built; add query params before making request");

        String key = keyValuePair.key();
        String encodedValue = encode(String.valueOf(keyValuePair.value()));

        String queryParam = String.format("%s=%s", key, encodedValue);
        String queryParams = getQueryParams(List.of(queryParam));
        url += queryParams;

        return this;
    }

    private String encode(String value) {
        try {
            return URLEncoder.encode(value, StandardCharsets.UTF_8.toString());
        } catch (UnsupportedEncodingException exception) {
            return value;
        }
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

    public static class QueryUtils {
        public static String toQueryListAsString(List<?> list) {
            return toQueryListAsString(list, ",");
        }

        private static String toQueryListAsString(List<?> list, String delimiter) {
            List<String> stringList = list.stream()
                .map(String::valueOf)
                .toList();

            return String.join(delimiter, stringList);
        }
    }
}

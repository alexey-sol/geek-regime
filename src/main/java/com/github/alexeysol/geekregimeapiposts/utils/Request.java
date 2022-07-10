package com.github.alexeysol.geekregimeapiposts.utils;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import static java.time.temporal.ChronoUnit.SECONDS;

public class Request {
    public static String get(String url) throws URISyntaxException, InterruptedException,
    ExecutionException {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(new URI(url))
            .header("Content-Type", "application/json")
            .timeout(Duration.of(10, SECONDS))
            .GET()
            .build();

        CompletableFuture<HttpResponse<String>> response = HttpClient.newBuilder()
            .build()
            .sendAsync(request, HttpResponse.BodyHandlers.ofString());

        return response.get().body();
    }
}

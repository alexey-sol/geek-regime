package com.github.alexeysol.geekregime.apicommons.util.http;

import com.fasterxml.jackson.core.type.TypeReference;
import com.github.alexeysol.geekregime.apicommons.exception.SerializedApiError;
import lombok.RequiredArgsConstructor;

import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@RequiredArgsConstructor
public class AppHttpClient {
    private final HttpClient httpClient;

    public AppHttpClient() {
        this.httpClient = HttpClient.newHttpClient();
    }

    public <T> T send(HttpRequest request, TypeReference<T> reference) {
        var response = httpClient
            .sendAsync(request, HttpResponse.BodyHandlers.ofString())
            .join();

        try {
            return new AppHttpResponse(response).content(reference);
        } catch (IllegalArgumentException exception) {
            throw new SerializedApiError(response.body());
        }
    }
}

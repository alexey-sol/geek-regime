package com.github.alexeysol.geekregime.apiaggregator.shared.util;

import com.fasterxml.jackson.core.type.TypeReference;
import com.github.alexeysol.geekregime.apicommons.util.http.AppHttpClient;
import com.github.alexeysol.geekregime.apicommons.util.http.AppHttpRequest;
import lombok.RequiredArgsConstructor;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;

@RequiredArgsConstructor
public class HttpEndpoint {
    private final HttpClient httpClient;
    private final URI uri;

    private String method = "GET";
    private HttpRequest.BodyPublisher bodyPublisher = HttpRequest.BodyPublishers.noBody();

    public HttpEndpoint method(String method, String bodyAsString) {
        this.method = method;
        this.bodyPublisher = HttpRequest.BodyPublishers.ofString(bodyAsString);
        return this;
    }

    public HttpEndpoint method(String method) {
        this.method = method;
        return this;
    }

    public <T> T request(TypeReference<T> reference) {
        var request = AppHttpRequest.builder()
            .uri(uri)
            .method(method, bodyPublisher)
            .build();

        return new AppHttpClient(httpClient).send(request, reference);
    }
}

package com.github.alexeysol.geekregime.apicommons.util.http;

import com.fasterxml.jackson.core.type.TypeReference;
import com.github.alexeysol.geekregime.apicommons.exception.SerializedApiException;
import lombok.experimental.UtilityClass;

import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@UtilityClass
public class AppHttpClient {
    public <T> T send(HttpRequest request, TypeReference<T> reference) {
        var response = HttpClient.newHttpClient()
            .sendAsync(request, HttpResponse.BodyHandlers.ofString())
            .join();

        try {
            return new AppHttpResponse(response).content(reference);
        } catch (IllegalArgumentException exception) {
            throw new SerializedApiException(response.body());
        }
    }
}

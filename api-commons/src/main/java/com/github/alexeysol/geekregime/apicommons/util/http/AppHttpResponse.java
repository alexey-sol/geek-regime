package com.github.alexeysol.geekregime.apicommons.util.http;

import com.fasterxml.jackson.core.type.TypeReference;
import com.github.alexeysol.geekregime.apicommons.util.parser.Json;
import org.springframework.http.HttpStatus;
import org.springframework.util.Assert;

import java.net.http.HttpResponse;

class AppHttpResponse {
    private final HttpResponse<String> response;

    public AppHttpResponse(HttpResponse<String> response) {
        this.response = response;
    }

    public <T> T content(Class<T> valueType) {
        assertIsSuccessful();
        return Json.parse(response.body(), valueType);
    }

    public <T> T content(TypeReference<T> valueTypeRef) {
        assertIsSuccessful();
        return Json.parse(response.body(), valueTypeRef);
    }

    private void assertIsSuccessful() {
        final String ASSERT_MESSAGE = "Response is not successful";
        Assert.isTrue(isSuccessful(), ASSERT_MESSAGE);
    }

    private boolean isSuccessful() {
        return (
            isHttpStatusSeries(HttpStatus.Series.SUCCESSFUL) ||
            isHttpStatusSeries(HttpStatus.Series.REDIRECTION)
        );
    }

    private boolean isHttpStatusSeries(HttpStatus.Series series) {
        String statusAsString = String.valueOf(response.statusCode());
        String clientErrorSeriesAsString = String.valueOf(series.value());
        return statusAsString.startsWith(clientErrorSeriesAsString);
    }
}

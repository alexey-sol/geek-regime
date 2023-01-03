package com.github.alexeysol.geekregimeapicommons.utils.http;

import com.fasterxml.jackson.core.type.TypeReference;
import com.github.alexeysol.geekregimeapicommons.utils.parsers.Json;
import org.springframework.http.HttpStatus;
import org.springframework.util.Assert;

import java.net.http.HttpResponse;

public class ResponseReader {
    private final HttpResponse<String> response;

    public ResponseReader(HttpResponse<String> response) {
        this.response = response;
    }

    public <Content> Content content(Class<Content> valueType) {
        assertIsSuccessful();
        return Json.parse(response.body(), valueType);
    }

    public <Content> Content content(TypeReference<Content> valueTypeRef) {
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

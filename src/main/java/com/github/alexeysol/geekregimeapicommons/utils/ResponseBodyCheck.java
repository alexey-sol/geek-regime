package com.github.alexeysol.geekregimeapicommons.utils;

import org.springframework.http.HttpStatus;

import java.util.Map;
import java.util.Objects;

public class ResponseBodyCheck<Value> {
    private final Map<String, Value> body;

    public ResponseBodyCheck(Map<String, Value> body) {
        this.body = body;
    }

    public boolean isApiException() {
        return (
            isHttpStatusSeries(HttpStatus.Series.CLIENT_ERROR) ||
            isHttpStatusSeries(HttpStatus.Series.SERVER_ERROR)
        );
    }

    private boolean isHttpStatusSeries(HttpStatus.Series series) {
        final String STATUS_FIELD = "status";
        Object unknownStatus = body.getOrDefault(STATUS_FIELD, null);

        if (Objects.isNull(unknownStatus)) {
            return false;
        }

        String statusAsString = String.valueOf(unknownStatus);
        String clientErrorSeriesAsString = String.valueOf(series.value());
        return statusAsString.startsWith(clientErrorSeriesAsString);
    }
}

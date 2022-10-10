package com.github.alexeysol.geekregimeapicommons.utils;

import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public class ExceptionMapReader {
    private final String ERROR_FIELD = "error";
    private final String MESSAGE_FIELD = "message";
    private final String STATUS_FIELD = "status";

    private final Map<String, Object> map;

    public ExceptionMapReader(Map<String, Object> map) {
        this.map = map;
    }

    public boolean isApiException() {
        return (
            map.containsKey(ERROR_FIELD) &&
            map.containsKey(MESSAGE_FIELD) &&
            map.containsKey(STATUS_FIELD)
        );
    }

    public Optional<String> getMessage() {
        Optional<String> optionalErrors = getValidationErrors();

        if (optionalErrors.isPresent()) {
            return optionalErrors;
        }

        return map.containsKey(MESSAGE_FIELD)
            ? Optional.of(map.get(MESSAGE_FIELD).toString())
            : Optional.empty();
    }

    public Optional<HttpStatus> getStatus() {
        if (!map.containsKey(STATUS_FIELD)) {
            return Optional.empty();
        }

        int parsedStatus = Integer.parseInt(String.valueOf(map.get(STATUS_FIELD)));
        return Optional.of(HttpStatus.valueOf(parsedStatus));
    }

    private Optional<String> getValidationErrors() {
        String ERRORS_FIELD = "errors";
        String DEFAULT_MESSAGES_FIELD = "defaultMessage";
        String MESSAGE_DELIMITER = " / ";

        if (!map.containsKey(ERRORS_FIELD)) {
            return Optional.empty();
        }

        var errors = ObjectCasting.objectToList(map.get(ERRORS_FIELD), Map.class);

        List<String> defaultMessages = errors.stream()
            .map(err -> (err.containsKey(DEFAULT_MESSAGES_FIELD))
                ? String.valueOf(err.get(DEFAULT_MESSAGES_FIELD))
                : "")
            .toList();

        String joinedMessages = String.join(MESSAGE_DELIMITER, defaultMessages);
        return Optional.of(joinedMessages);
    }
}

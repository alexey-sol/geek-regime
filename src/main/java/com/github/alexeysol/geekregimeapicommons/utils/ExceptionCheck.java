package com.github.alexeysol.geekregimeapicommons.utils;

import org.springframework.http.HttpStatus;

import java.util.Map;

public class ExceptionCheck {
    private final String ERROR_FIELD = "error";
    private final String MESSAGE_FIELD = "message";
    private final String STATUS_FIELD = "status";

    private final Map<String, Object> map;

    public ExceptionCheck(Map<String, Object> map) {
        this.map = map;
    }

    public boolean isNotFoundException() {
        int notFoundCode = HttpStatus.NOT_FOUND.value();
        return isApiException() && map.get(STATUS_FIELD).equals(notFoundCode);
    }

    public boolean isAlreadyExistsException() {
        int conflictCode = HttpStatus.CONFLICT.value();
        return isApiException() && map.get(STATUS_FIELD).equals(conflictCode);
    }

    public boolean isApiException() {
        return (
            map.containsKey(ERROR_FIELD) &&
            map.containsKey(MESSAGE_FIELD) &&
            map.containsKey(STATUS_FIELD)
        );
    }

    public String getMessageIfExists() {
        return map.containsKey(MESSAGE_FIELD)
            ? map.get(MESSAGE_FIELD).toString()
            : "";
    }
}

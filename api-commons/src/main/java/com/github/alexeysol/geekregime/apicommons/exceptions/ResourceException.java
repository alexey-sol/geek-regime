package com.github.alexeysol.geekregime.apicommons.exceptions;

import com.github.alexeysol.geekregime.apicommons.models.exceptions.ErrorDetail;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;

// Should be thrown in case of invalid data provided by the request: it might be an attempt
// to fetch a user that doesn't exist (404. Not found) or updating an email of one user with
// the email of another (409. Conflict).
// ResourceException is supposed to be thrown only from the controller layer.
public class ResourceException extends ResponseStatusException {
    private static final String MESSAGE_TEMPLATE = "Error is caused by value provided in " +
        "following field: %s";

    private ErrorDetail detail;

    public ResourceException(HttpStatus status, String reason) {
        super(status, reason);
    }

    public ResourceException(ErrorDetail detail) {
        super(ErrorDetail.codeToStatus(detail.getCode()));
        this.detail = detail;
    }

    @Override
    public String getReason() {
        return (Objects.isNull(detail))
            ? super.getReason()
            : String.format(MESSAGE_TEMPLATE, detail.getField());
    }

    public ErrorDetail.View getDetail() {
        return (Objects.isNull(detail))
            ? null
            : new ErrorDetail.View(detail.getCode().value(), detail.getField());
    }
}

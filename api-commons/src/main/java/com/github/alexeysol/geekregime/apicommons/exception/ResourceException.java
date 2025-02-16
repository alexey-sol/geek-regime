package com.github.alexeysol.geekregime.apicommons.exception;

import com.github.alexeysol.geekregime.apicommons.generated.model.ApiErrorDetail;
import com.github.alexeysol.geekregime.apicommons.generated.model.ErrorCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

// Should be thrown in case of invalid data provided by the request: it might be an attempt
// to fetch a user that doesn't exist (404. Not found) or updating an email of one user with
// the email of another (409. Conflict).
// ResourceException is supposed to be thrown only from the controller layer.
public class ResourceException extends ResponseStatusException {
    private static final HttpStatus DEFAULT_HTTP_STATUS = HttpStatus.BAD_REQUEST;

    private static final Map<ErrorCode, HttpStatus> mapCodeToStatus = new HashMap<>();

    static {
        mapCodeToStatus.put(ErrorCode.ABSENT, HttpStatus.NOT_FOUND);
        mapCodeToStatus.put(ErrorCode.ALREADY_EXISTS, HttpStatus.CONFLICT);
        mapCodeToStatus.put(ErrorCode.ALREADY_REMOVED, HttpStatus.CONFLICT);
        mapCodeToStatus.put(ErrorCode.INVALID, HttpStatus.UNPROCESSABLE_ENTITY);
        mapCodeToStatus.put(ErrorCode.MISMATCH, HttpStatus.FORBIDDEN);
    }

    private static final String MESSAGE_TEMPLATE = "Error is caused by value provided in " +
        "following field: %s";

    private ErrorCode code;
    private String field;

    public ResourceException(HttpStatus status, String reason) {
        super(status, reason);
    }

    public ResourceException(ErrorCode code, String field) {
        super(codeToStatus(code));
        this.code = code;
        this.field = field;
    }

    @Override
    public String getReason() {
        return (Objects.isNull(field))
            ? super.getReason()
            : String.format(MESSAGE_TEMPLATE, field);
    }

    public Optional<ApiErrorDetail> getApiErrorDetail() {
        if (Objects.isNull(code) || Objects.isNull(field)) {
            return Optional.empty();
        }

        return Optional.of(new ApiErrorDetail(code.toString(), field));
    }

    private static HttpStatus codeToStatus(ErrorCode code) {
        return mapCodeToStatus.getOrDefault(code, DEFAULT_HTTP_STATUS);
    }
}

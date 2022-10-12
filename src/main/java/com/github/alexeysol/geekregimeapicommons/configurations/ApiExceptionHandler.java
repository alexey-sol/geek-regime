package com.github.alexeysol.geekregimeapicommons.configurations;

import com.github.alexeysol.geekregimeapicommons.exceptions.ApiException;
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceException;
import com.github.alexeysol.geekregimeapicommons.models.ErrorDetail;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.*;

public class ApiExceptionHandler extends ResponseEntityExceptionHandler {
    private final boolean isProduction;
    private final String resource;

    public ApiExceptionHandler(String resource, boolean isProduction) {
        this.resource = resource;
        this.isProduction = isProduction;
    }

    @ExceptionHandler(value = { ResponseStatusException.class })
    protected ResponseEntity<Object> handleResponseStatus(
        ResponseStatusException exception,
        WebRequest request
    ) {
        HttpStatus status = exception.getStatus();
        String message = createMessage(exception);
        List<ErrorDetail.View> details = createDetails(exception);
        String trace = createTrace(exception);

        ApiException body = createBody(status, message, details, trace);

        return handleExceptionInternal(exception, body, new HttpHeaders(), status, request);
    }

    private String createMessage(ResponseStatusException exception) {
        return exception.getReason();
    }

    private List<ErrorDetail.View> createDetails(ResponseStatusException exception) {
        List<ErrorDetail.View> details = new ArrayList<>();

        if (exception instanceof ResourceException) {
            ErrorDetail.View detail = ((ResourceException) exception).getDetail();

            if (Objects.nonNull(detail)) {
                details.add(detail);
            }
        }

        return details;
    }

    @NotNull
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
        @NotNull MethodArgumentNotValidException exception,
        @NotNull HttpHeaders headers,
        @NotNull HttpStatus status,
        @NotNull WebRequest request
    ) {
        HttpStatus newStatus = HttpStatus.UNPROCESSABLE_ENTITY;
        String message = createMessage(exception);
        List<ErrorDetail.View> details = createDetails(exception);
        String trace = createTrace(exception);

        ApiException body = createBody(newStatus, message, details, trace);

        return handleExceptionInternal(exception, body, headers, newStatus, request);
    }

    private String createMessage(MethodArgumentNotValidException exception) {
        BindingResult bindingResult = exception.getBindingResult();
        List<String> defaultMessages = new ArrayList<>();

        bindingResult.getFieldErrors()
            .forEach(detail -> {
                if (Objects.nonNull(detail)) {
                    defaultMessages.add(detail.getDefaultMessage());
                }
            });

        return String.join(", ", defaultMessages);
    }

    private List<ErrorDetail.View> createDetails(MethodArgumentNotValidException exception) {
        BindingResult bindingResult = exception.getBindingResult();

        return bindingResult.getFieldErrors()
            .stream()
            .map(detail -> new ErrorDetail.View(detail.getCode(), detail.getField()))
            .toList();
    }

    private String createTrace(Throwable throwable) {
        return Arrays.toString(throwable.getStackTrace());
    }

    private ApiException createBody(
        HttpStatus status,
        String message,
        List<ErrorDetail.View> details,
        String trace
    ) {
        return new ApiException(
            status.value(),
            resource,
            message,
            details,
            new Date().toInstant().toString(),
            (isProduction) ? null : trace
        );
    }
}

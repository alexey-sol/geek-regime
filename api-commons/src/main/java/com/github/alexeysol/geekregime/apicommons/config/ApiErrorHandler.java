package com.github.alexeysol.geekregime.apicommons.config;

import com.github.alexeysol.geekregime.apicommons.exception.ResourceException;
import com.github.alexeysol.geekregime.apicommons.generated.model.ApiError;
import com.github.alexeysol.geekregime.apicommons.generated.model.ApiErrorDetail;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.constraints.NotNull;
import java.util.*;

public class ApiErrorHandler extends ResponseEntityExceptionHandler {
    private final boolean isProduction;
    private final String resource;

    public ApiErrorHandler(String resource, boolean isProduction) {
        this.resource = resource;
        this.isProduction = isProduction;
    }

    @ExceptionHandler(value = { ResponseStatusException.class })
    protected ResponseEntity<Object> handleResponseStatus(
        ResponseStatusException exception,
        WebRequest request
    ) {
        HttpStatus status = exception.getStatus();
        String description = request.getDescription(false);
        String message = createMessage(exception);
        List<ApiErrorDetail> details = createDetails(exception);
        String trace = createTrace(exception);

        ApiError body = createBody(status, description, message, details, trace);

        return handleExceptionInternal(exception, body, new HttpHeaders(), status, request);
    }

    private String createMessage(ResponseStatusException exception) {
        return exception.getReason();
    }

    private List<ApiErrorDetail> createDetails(ResponseStatusException exception) {
        List<ApiErrorDetail> details = new ArrayList<>();

        if (exception instanceof ResourceException) {
            Optional<ApiErrorDetail> optionalDetail = ((ResourceException) exception).getApiErrorDetail();
            optionalDetail.ifPresent(details::add);
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
        String description = request.getDescription(false);
        String message = createMessage(exception);
        List<ApiErrorDetail> details = createDetails(exception);
        String trace = createTrace(exception);

        ApiError body = createBody(newStatus, description, message, details, trace);

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

    private List<ApiErrorDetail> createDetails(MethodArgumentNotValidException exception) {
        BindingResult bindingResult = exception.getBindingResult();

        return bindingResult.getFieldErrors()
            .stream()
            .map(detail -> new ApiErrorDetail(detail.getCode(), detail.getField()))
            .toList();
    }

    private String createTrace(Throwable throwable) {
        return Arrays.toString(throwable.getStackTrace());
    }

    private ApiError createBody(
        HttpStatus status,
        String description,
        String message,
        List<ApiErrorDetail> details,
        String trace
    ) {
        final String URI_PREFIX = "uri=";
        String descriptionWithoutPrefix = description.split(URI_PREFIX)[1];

        String path = (Objects.nonNull(descriptionWithoutPrefix))
            ? descriptionWithoutPrefix
            : description;

        return new ApiError(
            status.value(),
            path,
            resource,
            message,
            details,
            new Date().toInstant().toString(),
            (isProduction) ? null : trace
        );
    }
}

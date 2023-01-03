package com.github.alexeysol.geekregime.apiaggregator.configurations;

import com.github.alexeysol.geekregime.apicommons.constants.Defaults;
import com.github.alexeysol.geekregime.apicommons.exceptions.SerializedApiException;
import com.github.alexeysol.geekregime.apicommons.models.dtos.shared.ApiExceptionDto;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.*;

@ControllerAdvice
public class AggregatorExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(value = { SerializedApiException.class })
    protected ResponseEntity<Object> handleSerializedApi(
        SerializedApiException exception,
        WebRequest request
    ) {
        ApiExceptionDto body = createBody(exception);
        HttpStatus status = getStatus(body);

        return handleExceptionInternal(exception, body, new HttpHeaders(), status, request);
    }

    private ApiExceptionDto createBody(SerializedApiException exception) {
        return new SerializedApiException.Builder(exception.getJson())
            .buildAll()
            .getResult();
    }

    private HttpStatus getStatus(ApiExceptionDto exception) {
        HttpStatus nullableStatus = HttpStatus.resolve(exception.getStatus());

        return (Objects.nonNull(nullableStatus))
            ? nullableStatus
            : Defaults.API_EXCEPTION_HTTP_STATUS;
    }
}

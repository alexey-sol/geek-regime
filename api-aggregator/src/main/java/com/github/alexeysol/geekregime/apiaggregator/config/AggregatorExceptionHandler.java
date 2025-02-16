package com.github.alexeysol.geekregime.apiaggregator.config;

import com.github.alexeysol.geekregime.apicommons.constant.Default;
import com.github.alexeysol.geekregime.apicommons.exception.SerializedApiError;
import com.github.alexeysol.geekregime.apicommons.generated.model.ApiError;
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
    @ExceptionHandler(value = { SerializedApiError.class })
    protected ResponseEntity<Object> handleSerializedApi(
        SerializedApiError exception,
        WebRequest request
    ) {
        ApiError body = createBody(exception);
        HttpStatus status = getStatus(body);

        return handleExceptionInternal(exception, body, new HttpHeaders(), status, request);
    }

    private ApiError createBody(SerializedApiError exception) {
        return new SerializedApiError.Builder(exception.getJson())
            .buildAll()
            .getResult();
    }

    private HttpStatus getStatus(ApiError exception) {
        HttpStatus nullableStatus = HttpStatus.resolve(exception.getStatus());

        return (Objects.nonNull(nullableStatus))
            ? nullableStatus
            : Default.API_ERROR_HTTP_STATUS;
    }
}

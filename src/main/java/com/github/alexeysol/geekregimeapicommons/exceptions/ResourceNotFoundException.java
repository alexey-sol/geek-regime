package com.github.alexeysol.geekregimeapicommons.exceptions;

import com.github.alexeysol.geekregimeapicommons.models.ApiResource;
import com.github.alexeysol.geekregimeapicommons.models.ApiResourceExceptionCode;
import com.github.alexeysol.geekregimeapicommons.models.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends BaseResourceException {
    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(ApiResource resource, Long id) {
        this(resource, new Pair<>("id", id.toString()));
    }

    public ResourceNotFoundException(
        ApiResource resource,
        Pair<String, String> keyValuePairCausedException
    ) {
        super(resource, ApiResourceExceptionCode.NOT_FOUND, keyValuePairCausedException);
    }

    public ResourceNotFoundException(ApiResource resource) {
        super(resource, ApiResourceExceptionCode.NOT_FOUND);
    }
}

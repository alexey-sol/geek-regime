package com.github.alexeysol.geekregimeapicommons.exceptions;

import com.github.alexeysol.geekregimeapicommons.models.ApiResource;
import com.github.alexeysol.geekregimeapicommons.models.ApiResourceExceptionCode;
import com.github.alexeysol.geekregimeapicommons.models.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class ResourceAlreadyExistsException extends BaseResourceException {
    public ResourceAlreadyExistsException(String message) {
        super(message);
    }

    public ResourceAlreadyExistsException(ApiResource resource, Long id) {
        this(resource, new Pair<>("id", id.toString()));
    }

    public ResourceAlreadyExistsException(
        ApiResource resource,
        Pair<String, String> keyValuePairCausedException
    ) {
        super(resource, ApiResourceExceptionCode.ALREADY_EXISTS, keyValuePairCausedException);
    }

    public ResourceAlreadyExistsException(ApiResource resource) {
        super(resource, ApiResourceExceptionCode.ALREADY_EXISTS);
    }
}

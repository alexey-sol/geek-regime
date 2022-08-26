package com.github.alexeysol.geekregimeapicommons.exceptions;

import com.github.alexeysol.geekregimeapicommons.constants.ApiResource;
import com.github.alexeysol.geekregimeapicommons.constants.ApiResourceExceptionCode;
import com.github.alexeysol.geekregimeapicommons.models.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN)
public class ResourceForbiddenException extends BaseResourceException {
    public ResourceForbiddenException(String message) {
        super(message);
    }

    public ResourceForbiddenException(ApiResource resource, Long id) {
        this(resource, new Pair<>("id", id.toString()));
    }

    public ResourceForbiddenException(
        ApiResource resource,
        Pair<String, String> keyValuePairCausedException
    ) {
        super(resource, ApiResourceExceptionCode.FORBIDDEN, keyValuePairCausedException);
    }

    public ResourceForbiddenException(ApiResource resource) {
        super(resource, ApiResourceExceptionCode.FORBIDDEN);
    }
}

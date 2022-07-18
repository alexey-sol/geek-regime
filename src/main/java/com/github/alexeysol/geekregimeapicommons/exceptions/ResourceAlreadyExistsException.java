package com.github.alexeysol.geekregimeapicommons.exceptions;

import com.github.alexeysol.geekregimeapicommons.models.ApiResource;
import com.github.alexeysol.geekregimeapicommons.models.ApiResourceExceptionCode;
import com.github.alexeysol.geekregimeapicommons.models.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class ResourceAlreadyExistsException extends BaseApiPostsException {
    public ResourceAlreadyExistsException(String message) {
        super(message);
    }

    public ResourceAlreadyExistsException(ApiResource resource, Long id) {
        super(resource, ApiResourceExceptionCode.ALREADY_EXISTS, new Pair<>("id", id.toString()));
    }

    public ResourceAlreadyExistsException(ApiResource resource) {
        super(resource, ApiResourceExceptionCode.ALREADY_EXISTS);
    }
}

package com.github.alexeysol.geekregimeapiposts.exceptions;

import com.github.alexeysol.geekregimeapiposts.models.ApiResource;
import com.github.alexeysol.geekregimeapiposts.models.ApiResourceExceptionCode;
import com.github.alexeysol.geekregimeapiposts.utils.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends BaseApiPostsException {
    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(ApiResource resource, Long id) {
        super(resource, ApiResourceExceptionCode.NOT_FOUND, new Pair<>("id", id.toString()));
    }

    public ResourceNotFoundException(ApiResource resource) {
        super(resource, ApiResourceExceptionCode.NOT_FOUND);
    }
}

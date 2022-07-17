package com.github.alexeysol.geekregimeapiposts.exceptions;

import com.github.alexeysol.geekregimeapiposts.utils.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends BaseApiPostsException {
    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(
        String message,
        Pair<String, String> invalidKeyValuePair
    ) {
        super(message, invalidKeyValuePair);
    }
}

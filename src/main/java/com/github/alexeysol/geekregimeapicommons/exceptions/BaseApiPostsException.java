package com.github.alexeysol.geekregimeapicommons.exceptions;

import com.github.alexeysol.geekregimeapicommons.models.ApiResource;
import com.github.alexeysol.geekregimeapicommons.models.ApiResourceExceptionCode;
import com.github.alexeysol.geekregimeapicommons.models.Pair;

public abstract class BaseApiPostsException extends RuntimeException {
    private ApiResource resource = null;
    private ApiResourceExceptionCode code = null;
    private Pair<String, String> invalidKeyValuePair = null;

    public BaseApiPostsException(String message) {
        super(message);
    }

    public BaseApiPostsException(
        ApiResource resource,
        ApiResourceExceptionCode code,
        Pair<String, String> invalidKeyValuePair
    ) {
        this(resource, code);
        this.invalidKeyValuePair = invalidKeyValuePair;
    }

    public BaseApiPostsException(
        ApiResource resource,
        ApiResourceExceptionCode code
    ) {
        this.resource = resource;
        this.code = code;
    }

    private String createDetailsIfPossible() {
        if (invalidKeyValuePair == null) {
            return "";
        }

        String key = invalidKeyValuePair.key();
        String value = invalidKeyValuePair.value();
        return String.format("%s=%s", key, value);
    }

    @Override
    public String getMessage() {
        if (code == null) {
            return super.getMessage();
        }

        String message = String.format("%s/%s", resource, code);
        String details = createDetailsIfPossible();

        if (!details.isEmpty()) {
            message = String.format("%s/%s", message, details);
        }

        return message;
    }
}

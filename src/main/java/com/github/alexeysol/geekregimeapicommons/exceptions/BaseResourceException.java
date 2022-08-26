package com.github.alexeysol.geekregimeapicommons.exceptions;

import com.github.alexeysol.geekregimeapicommons.constants.ApiResource;
import com.github.alexeysol.geekregimeapicommons.constants.ApiResourceExceptionCode;
import com.github.alexeysol.geekregimeapicommons.models.Pair;

public abstract class BaseResourceException extends RuntimeException {
    private ApiResource resource = null;
    private ApiResourceExceptionCode code = null;
    private Pair<String, String> keyValuePairCausedException = null;

    public BaseResourceException(String message) {
        super(message);
    }

    public BaseResourceException(
        ApiResource resource,
        ApiResourceExceptionCode code,
        Pair<String, String> keyValuePairCausedException
    ) {
        this(resource, code);
        this.keyValuePairCausedException = keyValuePairCausedException;
    }

    public BaseResourceException(
        ApiResource resource,
        ApiResourceExceptionCode code
    ) {
        this.resource = resource;
        this.code = code;
    }

    private String createDetailsIfPossible() {
        if (keyValuePairCausedException == null) {
            return "";
        }

        String key = keyValuePairCausedException.key();
        String value = keyValuePairCausedException.value();
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

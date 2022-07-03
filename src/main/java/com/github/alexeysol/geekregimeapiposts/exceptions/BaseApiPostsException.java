package com.github.alexeysol.geekregimeapiposts.exceptions;

import com.github.alexeysol.geekregimeapiposts.utils.Pair;

public abstract class BaseApiPostsException extends RuntimeException {
    private Pair<String, String> invalidKeyValuePair = null;

    public BaseApiPostsException(
        String message,
        Pair<String, String> invalidKeyValuePair
    ) {
        super(message);
        this.invalidKeyValuePair = invalidKeyValuePair;
    }

    public BaseApiPostsException(String message) {
        super(message);
    }

    public BaseApiPostsException(Pair<String, String> invalidKeyValuePair) {
        this.invalidKeyValuePair = invalidKeyValuePair;
    }

    private String getExtraInfoIfAvailable() {
        if (invalidKeyValuePair == null) {
            return "";
        }

        String key = invalidKeyValuePair.key();
        String value = invalidKeyValuePair.value();
        return String.format(", provided %s = %s", key, value);
    }

    @Override
    public String getMessage() {
        return String.format("%s%s", super.getMessage(), getExtraInfoIfAvailable());
    }
}

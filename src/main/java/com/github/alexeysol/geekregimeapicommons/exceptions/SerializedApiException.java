package com.github.alexeysol.geekregimeapicommons.exceptions;

public class SerializedApiException extends IllegalArgumentException {
    public SerializedApiException(String json) {
        super(json);
    }

    public String getJson() {
        return this.getMessage();
    }
}

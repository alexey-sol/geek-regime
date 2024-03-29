package com.github.alexeysol.geekregime.apicommons.constants;

import org.springframework.http.HttpStatus;

public class Defaults {
    public static final HttpStatus API_EXCEPTION_HTTP_STATUS = HttpStatus.INTERNAL_SERVER_ERROR;
    public static final String PRIMARY_KEY_NAME = "id";
    public static final long NOT_FOUND_BY_ID = -1L;
}

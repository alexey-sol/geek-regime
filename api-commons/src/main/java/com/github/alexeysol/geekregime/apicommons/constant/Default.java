package com.github.alexeysol.geekregime.apicommons.constant;

import lombok.experimental.UtilityClass;
import org.springframework.http.HttpStatus;

@UtilityClass
public class Default {
    public final HttpStatus API_EXCEPTION_HTTP_STATUS = HttpStatus.INTERNAL_SERVER_ERROR;
    public final String PRIMARY_KEY_NAME = "id";
    public final long NOT_FOUND_BY_ID = -1L;
}

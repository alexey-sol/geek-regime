package com.github.alexeysol.geekregime.apicommons.models.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.Map;

@Data
public class ErrorDetail {
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class View {
        private String code;
        private String field;
    }

    private static final HttpStatus DEFAULT_HTTP_STATUS = HttpStatus.BAD_REQUEST;

    public enum Code {
        ABSENT("Absent"),
        ALREADY_EXISTS("AlreadyExists"),
        INVALID("Invalid"),
        MISMATCH("Mismatch");

        private final String value;

        Code(String value) {
            this.value = value;
        }

        public String value() {
            return value;
        }
    }

    static private final Map<Code, HttpStatus> mapCodeToStatus = new HashMap<>();

    static {
        mapCodeToStatus.put(Code.ABSENT, HttpStatus.NOT_FOUND);
        mapCodeToStatus.put(Code.ALREADY_EXISTS, HttpStatus.CONFLICT);
        mapCodeToStatus.put(Code.INVALID, HttpStatus.UNPROCESSABLE_ENTITY);
        mapCodeToStatus.put(Code.MISMATCH, HttpStatus.FORBIDDEN);
    }

    private final Code code;
    private final String field;

    public static HttpStatus codeToStatus(Code code) {
        return mapCodeToStatus.getOrDefault(code, DEFAULT_HTTP_STATUS);
    }
}

package com.github.alexeysol.geekregime.apicommons.exception;

import com.github.alexeysol.geekregime.apicommons.constant.Default;
import com.github.alexeysol.geekregime.apicommons.model.exception.ErrorDetail;
import com.github.alexeysol.geekregime.apicommons.model.dto.shared.ApiExceptionDto;
import com.github.alexeysol.geekregime.apicommons.util.parser.Json;
import com.github.alexeysol.geekregime.apicommons.util.ObjectCasting;
import com.github.alexeysol.geekregime.apicommons.util.converter.MapConverter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class SerializedApiException extends RuntimeException {
    // Expects serialized ApiExceptionDto as an argument.
    public SerializedApiException(String dtoJson) {
        super(dtoJson);
    }

    public String getJson() {
        return this.getMessage();
    }

    // Deserializer for JSON passed to SerializedApiException.
    public static class Builder {
        private final Map<String, Object> rawData;
        private final ApiExceptionDto result = new ApiExceptionDto();

        public Builder(String dtoJson) {
            this.rawData = Json.parse(dtoJson);
        }

        public Builder buildStatus() {
            int status = (rawData.containsKey("status"))
                ? Integer.parseInt(String.valueOf(rawData.get("status")))
                : Default.API_EXCEPTION_HTTP_STATUS.value();

            result.setStatus(status);
            return this;
        }

        public Builder buildPath() {
            String path = (rawData.containsKey("path"))
                ? String.valueOf(rawData.get("path"))
                : null;

            result.setPath(path);
            return this;
        }

        public Builder buildResource() {
            String resource = (rawData.containsKey("resource"))
                ? String.valueOf(rawData.get("resource"))
                : null;

            result.setResource(resource);
            return this;
        }

        public Builder buildMessage() {
            String message = (rawData.containsKey("message"))
                ? String.valueOf(rawData.get("message"))
                : null;

            result.setMessage(message);
            return this;
        }

        public Builder buildDetails() {
            List<Map> unknownDetails = (rawData.containsKey("details"))
                ? ObjectCasting.objectToList(rawData.get("details"), Map.class)
                : new ArrayList<>();

            List<ErrorDetail.View> details = unknownDetails.stream()
                .map(detail -> MapConverter.toClass(detail, ErrorDetail.View.class))
                .toList();

            result.setDetails(details);
            return this;
        }

        public Builder buildTimestamp() {
            String timestamp = (rawData.containsKey("timestamp"))
                ? String.valueOf(rawData.get("timestamp"))
                : null;

            result.setTimestamp(timestamp);
            return this;
        }

        public Builder buildTrace() {
            String trace = (rawData.containsKey("trace"))
                ? String.valueOf(rawData.get("trace"))
                : null;

            result.setTrace(trace);
            return this;
        }

        public Builder buildAll() {
            return buildStatus()
                .buildPath()
                .buildResource()
                .buildMessage()
                .buildDetails()
                .buildTimestamp()
                .buildTrace();
        }

        public ApiExceptionDto getResult() {
            return result;
        }
    }
}

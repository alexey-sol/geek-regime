package com.github.alexeysol.geekregime.apicommons.util.converter;

import java.util.List;

public class FieldAssertion {
    private static final String JOINED_FIELDS_DELIMITER = ", ";
    private static final String INVALID_KEYS = "Found unexpected key(s): %s. "
        + "Valid keys are: %s";
    private static final String EMPTY_KEYS = "At least 1 key must be provided";

    private final List<String> expectedFields;

    public FieldAssertion(List<String> expectedFields) {
        this.expectedFields = expectedFields;
    }

    public void assertFieldsAreValid(String field) {
        assertFieldsAreValid(List.of(field));
    }

    public void assertFieldsAreValid(List<String> fields) throws IllegalArgumentException {
        if (fields.isEmpty()) {
            throw new IllegalArgumentException(EMPTY_KEYS);
        }

        List<String> invalidFields = fields.stream()
            .distinct()
            .filter(item -> !expectedFields.contains(item))
            .toList();

        if (invalidFields.size() > 0) {
            String message = getAssertionMessage(invalidFields);
            throw new IllegalArgumentException(message);
        }
    }

    private String getAssertionMessage(List<String> invalidFields) {
        String joinedInvalidFields = String.join(JOINED_FIELDS_DELIMITER, invalidFields);
        String joinedExpectedFields = String.join(JOINED_FIELDS_DELIMITER, expectedFields);

        return String.format(INVALID_KEYS, joinedInvalidFields, joinedExpectedFields);
    }
}

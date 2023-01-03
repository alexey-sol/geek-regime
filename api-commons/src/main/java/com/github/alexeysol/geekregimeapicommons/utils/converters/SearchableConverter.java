package com.github.alexeysol.geekregimeapicommons.utils.converters;

import com.github.alexeysol.geekregimeapicommons.models.dtos.query.SearchByDto;
import com.github.alexeysol.geekregimeapicommons.utils.parsers.Json;

import java.util.List;
import java.util.Objects;

public class SearchableConverter {
    private static final String INVALID_SORT_BY_FIELD_TEMPLATE = "Found unexpected value(s) in " +
        "searchBy fields: %s. Valid values are: %s";
    private static final String EMPTY_FIELD_LIST_MESSAGE = "Fields list in searchBy may not be " +
        "empty";

    private final String searchByJson;
    private final List<String> searchableFields;

    public SearchableConverter(String searchByJson, List<String> searchableFields) {
        this.searchByJson = Objects.requireNonNullElse(searchByJson, "");
        this.searchableFields = searchableFields;
    }

    public SearchByDto getValue() throws IllegalArgumentException {
        if (searchByJson.isEmpty()) {
            return null;
        }

        try {
            SearchByDto searchByDto = Json.parse(searchByJson, SearchByDto.class);

            assertSearchByFieldsIsValid(searchByDto.getFields());

            return searchByDto;
        } catch (RuntimeException exception) {
            throw new IllegalArgumentException(exception.getMessage());
        }
    }

    private void assertSearchByFieldsIsValid(List<String> fields) throws IllegalArgumentException {
        if (fields.isEmpty()) {
            throw new IllegalArgumentException(EMPTY_FIELD_LIST_MESSAGE);
        }

        List<String> invalidFields = fields.stream()
            .distinct()
            .filter(item -> !searchableFields.contains(item))
            .toList();

        if (invalidFields.size() > 0) {
            String message = getAssertionMessage(invalidFields);
            throw new IllegalArgumentException(message);
        }
    }

    private String getAssertionMessage(List<String> invalidFields) {
        String joinedInvalidFields = String.join(", ", invalidFields);
        String joinedSearchableFields = String.join(", ", searchableFields);
        return String.format(INVALID_SORT_BY_FIELD_TEMPLATE, joinedInvalidFields,
            joinedSearchableFields);
    }
}

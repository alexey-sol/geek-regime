package com.github.alexeysol.geekregime.apicommons.utils.converters;

import com.github.alexeysol.geekregime.apicommons.models.dtos.query.SearchCriteria;
import com.github.alexeysol.geekregime.apicommons.utils.parsers.Json;

import java.util.List;
import java.util.Objects;

public class SearchableConverter {
    private final FieldAssertion fieldAssertion;
    private final String criteriaJson;

    public SearchableConverter(String criteriaJson, List<String> searchableFields) {
        this.fieldAssertion = new FieldAssertion(searchableFields);
        this.criteriaJson = Objects.requireNonNullElse(criteriaJson, "");
    }

    public SearchCriteria getValue() throws IllegalArgumentException {
        if (criteriaJson.isEmpty()) {
            return null;
        }

        SearchCriteria criteria = Json.parse(criteriaJson, SearchCriteria.class);
        fieldAssertion.assertFieldsAreValid(criteria.getKeys());

        return criteria;
    }
}

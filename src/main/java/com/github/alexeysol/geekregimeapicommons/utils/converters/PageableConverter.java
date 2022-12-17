package com.github.alexeysol.geekregimeapicommons.utils.converters;

import com.github.alexeysol.geekregimeapicommons.constants.Defaults;
import com.github.alexeysol.geekregimeapicommons.models.dtos.query.PagingDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.query.SortByDto;
import com.github.alexeysol.geekregimeapicommons.utils.parsers.Json;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Objects;

public class PageableConverter {
    private static final String INVALID_SORT_BY_FIELD_TEMPLATE = "Found unexpected sortBy " +
        "field value: %s. Value must be one of: %s";
    private static final List<String> DEFAULT_SORT_BY_FIELDS = List.of(
        Defaults.PRIMARY_KEY_NAME
    );

    private final String pagingJson;
    private final String sortByJson;
    private final List<String> sortableFields;

    public PageableConverter(String pagingJson, String sortByJson) {
        this(pagingJson, sortByJson, DEFAULT_SORT_BY_FIELDS);
    }

    public PageableConverter(String pagingJson, String sortByJson, List<String> sortableFields) {
        this.pagingJson = Objects.requireNonNullElse(pagingJson, "");
        this.sortByJson = Objects.requireNonNullElse(sortByJson, "");
        this.sortableFields = sortableFields;
    }

    public Pageable getPageable() throws IllegalArgumentException {
        try {
            Sort sort = sortByJsonToSortObject();

            PagingDto pagingDto = (pagingJson.isEmpty())
                ? new PagingDto()
                : Json.parse(pagingJson, PagingDto.class);

            return PageRequest.of(
                pagingDto.getPage(),
                pagingDto.getSize(),
                sort
            );
        } catch (RuntimeException exception) {
            throw new IllegalArgumentException(exception.getCause());
        }
    }

    private Sort sortByJsonToSortObject() throws IllegalArgumentException {
        SortByDto sortByDto = (sortByJson.isEmpty())
            ? new SortByDto()
            : Json.parse(sortByJson, SortByDto.class);

        assertSortByFieldIsValid(sortByDto.getField());

        Sort sort = Sort.by(sortByDto.getField());
        boolean isAscendingDirection = sortByDto.getDirection() == Sort.Direction.ASC;

        return (isAscendingDirection)
            ? sort.ascending()
            : sort.descending();
    }

    private void assertSortByFieldIsValid(String field) throws IllegalArgumentException {
        if (!sortableFields.contains(field)) {
            String message = getAssertionMessage(field);
            throw new IllegalArgumentException(message);
        }
    }

    private String getAssertionMessage(String invalidField) {
        String joinedFields = String.join(", ", sortableFields);
        return String.format(INVALID_SORT_BY_FIELD_TEMPLATE, invalidField, joinedFields);
    }
}

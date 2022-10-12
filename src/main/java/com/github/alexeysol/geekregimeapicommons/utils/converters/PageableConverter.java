package com.github.alexeysol.geekregimeapicommons.utils.converters;

import com.github.alexeysol.geekregimeapicommons.constants.DefaultsConstants;
import com.github.alexeysol.geekregimeapicommons.models.dtos.PagingDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.SortByDto;
import com.github.alexeysol.geekregimeapicommons.utils.Json;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

public class PageableConverter {
    private static final String INVALID_SORT_BY_FIELD_TEMPLATE = "Sort by field value must be " +
        "one of: %s";
    private static final List<String> DEFAULT_SORT_BY_FIELDS = List.of(
        DefaultsConstants.PRIMARY_KEY_NAME
    );

    private final String pagingJson;
    private final String sortByJson;
    private final List<String> sortByFields;

    public PageableConverter(String pagingJson, String sortByJson) {
        this(pagingJson, sortByJson, DEFAULT_SORT_BY_FIELDS);
    }

    public PageableConverter(String pagingJson, String sortByJson, List<String> sortByFields) {
        this.pagingJson = Objects.requireNonNullElse(pagingJson, "");
        this.sortByJson = Objects.requireNonNullElse(sortByJson, "");
        this.sortByFields = sortByFields;
    }

    public Pageable getPageable() throws IllegalArgumentException {
        Sort sort = sortByJsonToSortObject();

        PagingDto pagingDto = queryJsonToValue(
            pagingJson,
            PagingDto.class
        ).orElse(new PagingDto());

        return PageRequest.of(
            pagingDto.getPage(),
            pagingDto.getSize(),
            sort
        );
    }

    private Sort sortByJsonToSortObject() {
        SortByDto sortByDto = queryJsonToValue(
            sortByJson,
            SortByDto.class
        ).orElse(new SortByDto());

        assertSortByFieldIsValid(sortByDto.getField());

        Sort sort = Sort.by(sortByDto.getField());
        boolean isAscendingDirection = sortByDto.getDirection() == Sort.Direction.ASC;

        return (isAscendingDirection)
            ? sort.ascending()
            : sort.descending();
    }

    private static <Value> Optional<Value> queryJsonToValue(
        String queryJson,
        Class<Value> valueType
    ) {
        Optional<Value> value = Optional.empty();

        if (queryJson.isEmpty()) {
            return value;
        }

        return Optional.of(Json.parse(queryJson, valueType));
    }

    private void assertSortByFieldIsValid(String field) {
        if (!sortByFields.contains(field)) {
            String joinedFields = String.join(", ", sortByFields);
            String message = String.format(INVALID_SORT_BY_FIELD_TEMPLATE, joinedFields);
            throw new IllegalArgumentException(message);
        }
    }
}

package com.github.alexeysol.geekregimeapicommons.utils.converters;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.github.alexeysol.geekregimeapicommons.models.SortDirection;
import com.github.alexeysol.geekregimeapicommons.models.dtos.PagingOptions;
import com.github.alexeysol.geekregimeapicommons.models.dtos.SortByOptions;
import com.github.alexeysol.geekregimeapicommons.utils.Json;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Objects;
import java.util.Optional;

public class QueryConverter {
    private final String pagingJson;
    private final String sortByJson;

    public QueryConverter(String pagingJson, String sortByJson) {
        this.pagingJson = Objects.requireNonNullElse(pagingJson, "");
        this.sortByJson = Objects.requireNonNullElse(sortByJson, "");
    }

    static <Value> Optional<Value> queryJsonToValue(
        String queryJson,
        Class<Value> valueType
    ) {
        Optional<Value> value = Optional.empty();

        if (queryJson.isEmpty()) {
            return value;
        }

        try {
            value = Optional.of(Json.parse(queryJson, valueType));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return value;
    }

    public Pageable getPageable() {
        Sort sort = sortByJsonToSortObject();

        PagingOptions pagingOptions = queryJsonToValue(
            pagingJson,
            PagingOptions.class
        ).orElse(new PagingOptions());

        return PageRequest.of(
            pagingOptions.getPage(),
            pagingOptions.getSize(),
            sort
        );
    }

    private Sort sortByJsonToSortObject() {
        SortByOptions sortByOptions = queryJsonToValue(
            sortByJson,
            SortByOptions.class
        ).orElse(new SortByOptions());

        Sort sort = Sort.by(sortByOptions.getField());
        boolean isAscendingDirection = sortByOptions.getDirection() == SortDirection.ASC;

        return (isAscendingDirection)
            ? sort.ascending()
            : sort.descending();
    }
}

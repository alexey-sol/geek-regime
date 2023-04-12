package com.github.alexeysol.geekregime.apicommons.utils.converters;

import com.github.alexeysol.geekregime.apicommons.constants.Defaults;
import com.github.alexeysol.geekregime.apicommons.models.dtos.query.PagingCriteria;
import com.github.alexeysol.geekregime.apicommons.models.dtos.query.SortCriteria;
import com.github.alexeysol.geekregime.apicommons.utils.parsers.Json;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Objects;

public class PageableConverter {
    private static final List<String> DEFAULT_SORTABLE_FIELDS = List.of(
        Defaults.PRIMARY_KEY_NAME
    );

    private final FieldAssertion fieldAssertion;
    private final String pagingCriteriaJson;
    private final String sortCriteriaJson;

    public PageableConverter(String pagingCriteriaJson, String sortCriteriaJson) {
        this(pagingCriteriaJson, sortCriteriaJson, DEFAULT_SORTABLE_FIELDS);
    }

    public PageableConverter(
        String pagingCriteriaJson,
        String sortCriteriaJson,
        List<String> sortableFields
    ) {
        this.fieldAssertion = new FieldAssertion(sortableFields);
        this.pagingCriteriaJson = Objects.requireNonNullElse(pagingCriteriaJson, "");
        this.sortCriteriaJson = Objects.requireNonNullElse(sortCriteriaJson, "");
    }

    public Pageable getValue() throws IllegalArgumentException {
        Sort sort = sortCriteriaJsonToSortObject();

        PagingCriteria pagingCriteria = (pagingCriteriaJson.isEmpty())
            ? new PagingCriteria()
            : Json.parse(pagingCriteriaJson, PagingCriteria.class);

        return PageRequest.of(
            pagingCriteria.getPage(),
            pagingCriteria.getSize(),
            sort
        );
    }

    private Sort sortCriteriaJsonToSortObject() throws IllegalArgumentException {
        SortCriteria sortCriteria = (sortCriteriaJson.isEmpty())
            ? new SortCriteria()
            : Json.parse(sortCriteriaJson, SortCriteria.class);

        fieldAssertion.assertFieldsAreValid(sortCriteria.getKey());

        Sort sort = Sort.by(sortCriteria.getKey());
        boolean isAscendingDirection = sortCriteria.getDirection() == Sort.Direction.ASC;

        return (isAscendingDirection)
            ? sort.ascending()
            : sort.descending();
    }
}

package com.github.alexeysol.geekregime.apiposts.utils;

import com.github.alexeysol.geekregime.apicommons.constants.database.ComparisonOperator;
import com.github.alexeysol.geekregime.apicommons.constants.database.LogicalOperator;
import com.github.alexeysol.geekregime.apicommons.exceptions.ResourceException;
import com.github.alexeysol.geekregime.apicommons.models.dtos.query.FilterCriterion;
import com.github.alexeysol.geekregime.apicommons.models.dtos.query.SearchCriteria;
import com.github.alexeysol.geekregime.apicommons.models.utils.EntityFilter;
import com.github.alexeysol.geekregime.apicommons.utils.converters.SearchableConverter;
import com.github.alexeysol.geekregime.apiposts.constants.PostConstants;
import lombok.experimental.UtilityClass;
import org.springframework.http.HttpStatus;

import javax.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@UtilityClass
public class PostFilterUtils {
    public static EntityFilter<EntityFilter<FilterCriterion>> createFilter(
        List<EntityFilter<FilterCriterion>> criteria,
        LogicalOperator operation
    ) {
        if (criteria.isEmpty()) {
            return null;
        }

        var compositeFilter = new EntityFilter<EntityFilter<FilterCriterion>>(operation);
        compositeFilter.addAllFilterCriteria(criteria);
        return compositeFilter;
    }

    public static EntityFilter<EntityFilter<FilterCriterion>> createFilter(
        EntityFilter<FilterCriterion> criterion,
        LogicalOperator operation
    ) {
        if (Objects.isNull(criterion)) {
            return null;
        }

        return createFilter(List.of(criterion), operation);
    }

    public static EntityFilter<FilterCriterion> createFilter(
        long authorId,
        LogicalOperator operation
    ) {
        var criteria = createCriteria(authorId);
        var filter = new EntityFilter<FilterCriterion>(operation);
        filter.addAllFilterCriteria(criteria);
        return filter;
    }

    public static EntityFilter<FilterCriterion> createFilter(
        String searchBy,
        LogicalOperator operation
    ) {
        if (Objects.isNull(searchBy)) {
            return null;
        }

        var searchableConverter = new SearchableConverter(
            searchBy,
            PostConstants.SEARCHABLE_FIELDS
        );

        var filter = new EntityFilter<FilterCriterion>(operation);

        try {
            var searchCriteria = searchableConverter.getValue();

            if (Objects.nonNull(searchCriteria)) {
                var criteria = createCriteria(searchCriteria);
                filter.addAllFilterCriteria(criteria);
            }
        } catch (IllegalArgumentException | ConstraintViolationException exception) {
            throw new ResourceException(HttpStatus.UNPROCESSABLE_ENTITY, exception.getMessage());
        }

        return filter;
    }

    private static List<FilterCriterion> createCriteria(long authorId) {
        return List.of(FilterCriterion.builder()
            .key("userId")
            .operation(ComparisonOperator.EQUAL)
            .value(authorId)
            .build());
    }

    private static List<FilterCriterion> createCriteria(SearchCriteria searchCriteria) {
        var criteria = new ArrayList<FilterCriterion>();

        for (String key : searchCriteria.getKeys()) {
            var criterion = FilterCriterion.builder()
                .key(key)
                .operation(ComparisonOperator.ILIKE)
                .value(searchCriteria.getValue())
                .build();
            criteria.add(criterion);
        }

        return criteria;
    }

    @SafeVarargs
    public static List<EntityFilter<FilterCriterion>> combinePlainFilters(
        EntityFilter<FilterCriterion>... filters
    ) {
        return Arrays.stream(filters)
            .filter(Objects::nonNull)
            .toList();
    }
}

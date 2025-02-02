package com.github.alexeysol.geekregime.apiposts.util;

import com.github.alexeysol.geekregime.apicommons.constant.database.ComparisonOperator;
import com.github.alexeysol.geekregime.apicommons.constant.database.LogicalOperator;
import com.github.alexeysol.geekregime.apicommons.exception.ResourceException;
import com.github.alexeysol.geekregime.apicommons.generated.model.PostPagePeriod;
import com.github.alexeysol.geekregime.apicommons.model.dto.query.FilterCriterion;
import com.github.alexeysol.geekregime.apicommons.model.util.EntityFilter;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.http.HttpStatus;

import javax.validation.ConstraintViolationException;
import java.util.*;

import static com.github.alexeysol.geekregime.apiposts.constant.PostConstant.*;

@UtilityClass
public class PostFilterUtil {
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

    public static EntityFilter<FilterCriterion> createFilter(String text, LogicalOperator operation) {
        return createFilter(text, SEARCHABLE_FIELDS, operation);
    }

    public static EntityFilter<FilterCriterion> createSameOrAfterFilter(PostPagePeriod period) {
        var criteria = createSameOrAfterCriteria(period);
        var filter = new EntityFilter<FilterCriterion>(LogicalOperator.AND);
        filter.addAllFilterCriteria(criteria);
        return filter;
    }

    public static EntityFilter<FilterCriterion> createFilter(
        String text,
        List<String> searchableFields,
        LogicalOperator operation
    ) {
        if (Objects.isNull(text) || Objects.isNull(operation)) {
            return null;
        }

        var filter = new EntityFilter<FilterCriterion>(operation);

        try {
            var criteria = createCriteria(text, searchableFields);
            filter.addAllFilterCriteria(criteria);
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

    private static List<FilterCriterion> createCriteria(String text, List<String> searchableFields) {
        var criteria = new ArrayList<FilterCriterion>();

        for (String key : searchableFields) {
            var criterion = FilterCriterion.builder()
                .key(key)
                .operation(ComparisonOperator.ILIKE)
                .value(text)
                .build();
            criteria.add(criterion);
        }

        return criteria;
    }

    private static List<FilterCriterion> createSameOrAfterCriteria(PostPagePeriod period) {
        var optionalDate = getDateFromPeriod(period);

        return optionalDate.map(date -> List.of(FilterCriterion.builder()
            .key("createdAt")
            .operation(ComparisonOperator.SAME_OR_AFTER)
            .value(date)
            .build())).orElse(Collections.emptyList());
    }

    private static Optional<Date> getDateFromPeriod(PostPagePeriod period) {
        var now = new Date();

        return switch (period) {
            case DAY -> Optional.of(DateUtils.addDays(now, -1));
            case WEEK -> Optional.of(DateUtils.addDays(now, -7));
            case MONTH -> Optional.of(DateUtils.addMonths(now, -1));
            case YEAR -> Optional.of(DateUtils.addYears(now, -1));
            case OVERALL -> Optional.empty();
        };
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

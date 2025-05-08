package com.github.alexeysol.geekregime.apiposts.feature.post.util;

import com.github.alexeysol.geekregime.apicommons.constant.database.LogicalOperator;
import com.github.alexeysol.geekregime.apicommons.generated.model.PostPagePeriod;
import com.github.alexeysol.geekregime.apicommons.model.util.SpecificationUtil;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.data.jpa.domain.Specification;

import java.util.*;

import static com.github.alexeysol.geekregime.apiposts.feature.post.constant.PostConstant.*;

@UtilityClass
public class PostSpecificationUtil {
    public <T> Specification<T> byLikeIgnoreCaseSearchText(String text, List<String> searchIn) {
        if (Objects.isNull(text)) {
            return getDefault();
        }

        var searchableFields = (Objects.isNull(searchIn) || searchIn.isEmpty())
            ? SEARCHABLE_FIELDS
            : searchIn;

        return byLikeIgnoreCase(text, searchableFields);
    }

    private <T> Specification<T> byLikeIgnoreCase(String text, List<String> searchableFields) {
        Specification<T> specification = getDefault();

        for (String key : searchableFields) {
            Specification<T> specificationToAppend = SpecificationUtil.byLikeIgnoreCase(key, text);
            specification = appendSpecification(specification, specificationToAppend, LogicalOperator.OR);
        }

        return specification;
    }

    public <T> Specification<T> bySameOrAfterPeriod(String key, PostPagePeriod period) {
        var periodOrDefault = (Objects.isNull(period)) ? PostPagePeriod.OVERALL : period;
        var optionalDate = getDateFromPeriod(periodOrDefault);

        return optionalDate.map(date ->
            SpecificationUtil.<T>bySameOrAfter(key, date)).orElse(getDefault());
    }

    private Optional<Date> getDateFromPeriod(PostPagePeriod period) {
        var now = new Date();

        return switch (period) {
            case DAY -> Optional.of(DateUtils.addDays(now, -1));
            case WEEK -> Optional.of(DateUtils.addDays(now, -7));
            case MONTH -> Optional.of(DateUtils.addMonths(now, -1));
            case YEAR -> Optional.of(DateUtils.addYears(now, -1));
            case OVERALL -> Optional.empty();
        };
    }

    public <T> Specification<T> byEqual(String key, Object value) {
        return SpecificationUtil.byEqual(key, value);
    }

    public <T> Specification<T> byEqualAndIsMember(
        String key,
        Object value,
        String ownerTable,
        Class<?> ownerEntity
    ) {
        return SpecificationUtil.byEqualAndIsMember(key, value, ownerTable, ownerEntity);
    }

    @SafeVarargs
    public <T> Specification<T> compose(LogicalOperator operation, Specification<T>... specifications) {
        var specificationsToAppend = filterNullable(specifications);

        Specification<T> composedSpecification = getDefault();

        for (var specificationToAppend : specificationsToAppend) {
            composedSpecification = appendSpecification(composedSpecification, specificationToAppend, operation);
        }

        return composedSpecification;
    }

    @SafeVarargs
    private <T> List<Specification<T>> filterNullable(Specification<T>... filters) {
        return Arrays.stream(filters)
            .filter(Objects::nonNull)
            .toList();
    }

    private <T> Specification<T> appendSpecification(
        Specification<T> specification,
        Specification<T> specificationToAppend,
        LogicalOperator operation
    ) {
        return switch (operation) {
            case AND -> specification.and(specificationToAppend);
            case OR -> specification.or(specificationToAppend);
        };
    }

    private <T> Specification<T> getDefault() {
        return Specification.where(null);
    }
}

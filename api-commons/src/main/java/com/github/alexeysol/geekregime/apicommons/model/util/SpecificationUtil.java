package com.github.alexeysol.geekregime.apicommons.model.util;

import lombok.experimental.UtilityClass;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Root;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@UtilityClass
public class SpecificationUtil {
    public <T> Specification<T> byEqualAndIsMember(
        String key,
        Object value,
        Class<?> entity,
        String ownerTable
    ) {
        return (root, query, builder) -> {
            query.distinct(true);
            Root<?> entityRoot = query.from(entity);
            Expression<Collection<T>> owners = entityRoot.get(ownerTable);
            return builder.and(builder.equal(entityRoot.get(key), value), builder.isMember(root, owners));
        };
    }

    public <T> Specification<T> byEqual(String key, Object value) {
        return (root, query, builder) -> builder.equal(root.get(key), value);
    }

    public <T> Specification<T> byLike(String key, Object value) {
        return (root, query, builder) -> {
            String normValue = value.toString().trim();
            return builder.like(root.get(key), "%" + normValue + "%");
        };
    }

    public <T> Specification<T> byLikeIgnoreCase(String key, Object value) {
        return (root, query, builder) -> {
            String normValue = value.toString().toLowerCase().trim();
            return builder.like(builder.lower(root.get(key)), "%" + normValue + "%");
        };
    }

    public <T> Specification<T> byIn(String key, Object value) {
        if (!(value instanceof List<?>)) {
            return null;
        }

        return (root, query, builder) -> {
            Path<Object> path = root.get(key);
            CriteriaBuilder.In<Object> in = builder.in(path);

            for (Object listItem : (List<?>) value) {
                in.value(listItem);
            }

            return in;
        };
    }

    public <T> Specification<T> bySameOrAfter(String key, Object value) {
        if (!(value instanceof Date dateValue)) {
            return null;
        }

        return (root, query, builder) -> {
            var pathAsDate = root.get(key).as(Date.class);
            return builder.greaterThanOrEqualTo(pathAsDate, dateValue);
        };
    }
}

// The implementation basis was borrowed from here:
// https://www.baeldung.com/rest-api-search-language-spring-data-specifications#filter-using-specification

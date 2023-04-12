package com.github.alexeysol.geekregime.apicommons.models.utils;

import com.github.alexeysol.geekregime.apicommons.models.dtos.query.FilterCriterion;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.List;

abstract public class FilterSpecification<Entity> implements Specification<Entity> {
    private final FilterCriterion criteria;

    private CriteriaBuilder builder;
    private Root<Entity> root;
    private String key;
    private Object value;

    public FilterSpecification(FilterCriterion criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(
        Root<Entity> root,
        CriteriaQuery<?> query,
        CriteriaBuilder builder
    ) {
        this.root = root;
        this.builder = builder;
        key = criteria.getKey();
        value = criteria.getValue();

        return switch (criteria.getOperation()) {
            case EQUAL -> getEqualPredicate();
            case LIKE -> getLikePredicate();
            case ILIKE -> getLikeIgnoreCasePredicate();
            case IN -> getInPredicate();
        };
    }

    private Predicate getEqualPredicate() {
        return builder.equal(root.get(key), value);
    }

    private Predicate getLikePredicate() {
        String normValue = value.toString().trim();
        return builder.like(root.get(key), "%" + normValue + "%");
    }

    private Predicate getLikeIgnoreCasePredicate() {
        String normValue = value.toString().toLowerCase().trim();
        return builder.like(builder.lower(root.get(key)), "%" + normValue + "%");
    }

    private Predicate getInPredicate() {
        if (!(value instanceof List<?>)) {
            return null;
        }

        Path<Object> path = root.get(key);
        CriteriaBuilder.In<Object> in = builder.in(path);

        for (Object listItem : (List<?>) value) {
            in.value(listItem);
        }

        return in;
    }
}

// The implementation basis was borrowed from here:
// https://www.baeldung.com/rest-api-search-language-spring-data-specifications#filter-using-specification

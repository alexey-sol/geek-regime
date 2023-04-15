package com.github.alexeysol.geekregime.apicommons.models.database;

import com.github.alexeysol.geekregime.apicommons.models.dtos.query.FilterCriterion;
import org.springframework.data.jpa.domain.Specification;

public interface FilterSpecificationFactory<T> {
    public Specification<T> createSpecification(FilterCriterion criterion);
}

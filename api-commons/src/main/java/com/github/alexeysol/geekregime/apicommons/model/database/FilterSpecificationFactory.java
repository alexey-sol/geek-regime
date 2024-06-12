package com.github.alexeysol.geekregime.apicommons.model.database;

import com.github.alexeysol.geekregime.apicommons.model.dto.query.FilterCriterion;
import org.springframework.data.jpa.domain.Specification;

public interface FilterSpecificationFactory<T> {
    public Specification<T> createSpecification(FilterCriterion criterion);
}

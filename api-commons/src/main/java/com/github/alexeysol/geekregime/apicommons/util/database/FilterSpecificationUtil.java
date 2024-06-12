package com.github.alexeysol.geekregime.apicommons.util.database;

import com.github.alexeysol.geekregime.apicommons.constant.database.LogicalOperator;
import com.github.alexeysol.geekregime.apicommons.model.database.FilterSpecificationFactory;
import com.github.alexeysol.geekregime.apicommons.model.dto.query.FilterCriterion;
import com.github.alexeysol.geekregime.apicommons.model.util.EntityFilter;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class FilterSpecificationUtil<T> {
    private final FilterSpecificationFactory<T> filterSpecificationFactory;

    public FilterSpecificationUtil(FilterSpecificationFactory<T> filterSpecificationFactory) {
        this.filterSpecificationFactory = filterSpecificationFactory;
    }

    public Specification<T> createCompositeSpecification(
        EntityFilter<EntityFilter<FilterCriterion>> filter
    ) {
        var operation = filter.getOperation();
        var filterCriteria = filter.getFilterCriteria();

        List<Specification<T>> specificationGroups = new ArrayList<>();

        for (var nestedFilter : filterCriteria) {
            specificationGroups.add(createSpecification(nestedFilter));
        }

        Specification<T> compositeSpecification = Specification.where(null);

        for (var specificationToAppend : specificationGroups) {
            compositeSpecification = appendSpecification(compositeSpecification,
                specificationToAppend, operation);
        }

        return compositeSpecification;
    }

    public Specification<T> createSpecification(EntityFilter<FilterCriterion> filter) {
        var operation = filter.getOperation();
        var filterCriteria = filter.getFilterCriteria();

        Specification<T> specification = Specification.where(null);

        for (var criterion : filterCriteria) {
            Specification<T> specificationToAppend = filterSpecificationFactory
                .createSpecification(criterion);
            specification = appendSpecification(specification, specificationToAppend, operation);
        }

        return specification;
    }

    private Specification<T> appendSpecification(
        Specification<T> specification,
        Specification<T> specificationToAppend,
        LogicalOperator operation
    ) {
        return switch (operation) {
            case AND -> specification.and(specificationToAppend);
            case OR -> specification.or(specificationToAppend);
        };
    }
}

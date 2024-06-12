package com.github.alexeysol.geekregime.apicommons.model.util;

import com.github.alexeysol.geekregime.apicommons.constant.database.LogicalOperator;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class EntityFilter<FilterCriterion> {
    private final LogicalOperator operation;
    private final List<FilterCriterion> filterCriteria = new ArrayList<>();

    public void addFilterCriterion(FilterCriterion criterion) {
        this.filterCriteria.add(criterion);
    }

    public void addAllFilterCriteria(List<FilterCriterion> criteria) {
        this.filterCriteria.addAll(criteria);
    }
}

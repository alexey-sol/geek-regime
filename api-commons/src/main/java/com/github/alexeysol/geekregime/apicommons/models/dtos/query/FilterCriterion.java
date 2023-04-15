package com.github.alexeysol.geekregime.apicommons.models.dtos.query;

import com.github.alexeysol.geekregime.apicommons.constants.database.ComparisonOperator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FilterCriterion {
    @NotBlank
    private String key;

    @NotBlank
    private ComparisonOperator operation;

    @NotNull
    private Object value;
}

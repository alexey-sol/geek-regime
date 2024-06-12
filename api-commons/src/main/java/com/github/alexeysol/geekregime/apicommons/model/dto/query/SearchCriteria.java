package com.github.alexeysol.geekregime.apicommons.model.dto.query;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchCriteria {
    private final static int DEFAULT_LIMIT = 1000;

    @NotNull
    private List<String> keys = new ArrayList<>();

    @NotBlank
    private String value;

    @Min(1)
    private int limit = DEFAULT_LIMIT;
}

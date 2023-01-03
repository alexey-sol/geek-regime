package com.github.alexeysol.geekregimeapicommons.models.dtos.query;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchByDto {
    private final static int DEFAULT_LIMIT = 1000;

    @NotBlank
    private String term;

    private List<String> fields = new ArrayList<>();

    @Min(1)
    private int limit = DEFAULT_LIMIT;
}

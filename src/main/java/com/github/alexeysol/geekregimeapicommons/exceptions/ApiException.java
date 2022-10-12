package com.github.alexeysol.geekregimeapicommons.exceptions;

import com.github.alexeysol.geekregimeapicommons.models.ErrorDetail;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@RequiredArgsConstructor
public class ApiException {
    @NotNull private final int status;
    @NotNull private final String resource;
    @NotNull private final String message;
    @NotNull private final List<ErrorDetail.View> details;
    @NotNull private final String timestamp;
    private final String trace;
}

package com.github.alexeysol.geekregimeapicommons.models.dtos.shared;

import com.github.alexeysol.geekregimeapicommons.models.exceptions.ErrorDetail;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiExceptionDto {
    private int status;
    private String path;
    private String resource;
    private String message;
    private List<ErrorDetail.View> details;
    private String timestamp;
    private String trace;
}

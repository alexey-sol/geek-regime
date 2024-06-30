package com.github.alexeysol.geekregime.apiaggregator.shared.util;

import lombok.experimental.UtilityClass;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;
import java.util.Objects;

import static com.github.alexeysol.geekregime.apiaggregator.shared.constant.PathConstant.*;

@UtilityClass
public class UriUtil {
    public UriComponentsBuilder getApiUriBuilder(String baseUrl, String path) {
        return getApiUriBuilder(baseUrl, path, null);
    }

    public UriComponentsBuilder getApiUriBuilder(String baseUrl, String path, Map<String, String> queryParams) {
        var url = String.format("%s/%s/%s", baseUrl, API_PREFIX_V1_EXTERNAL, path);

        return UriComponentsBuilder.fromHttpUrl(url)
            .queryParams(convertQueryParams(queryParams));
    }

    private MultiValueMap<String, String> convertQueryParams(Map<String, String> params) {
        var queryParams = new LinkedMultiValueMap<String, String>();

        if (Objects.nonNull(params)) {
            queryParams.setAll(params);
        }

        return queryParams;
    }
}

package com.github.alexeysol.geekregime.apicommons.model.dto.query;

import com.github.alexeysol.geekregime.apicommons.constant.Default;
import lombok.Data;
import org.springframework.data.domain.Sort.Direction;

@Data
public class SortCriteria {
    private final static String DEFAULT_KEY = Default.PRIMARY_KEY_NAME;
    private final static Direction DEFAULT_DIRECTION = Direction.DESC;

    private String key = DEFAULT_KEY;

    private Direction direction = DEFAULT_DIRECTION;
}

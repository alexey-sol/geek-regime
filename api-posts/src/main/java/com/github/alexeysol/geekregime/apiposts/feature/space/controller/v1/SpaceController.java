package com.github.alexeysol.geekregime.apiposts.feature.space.controller.v1;

import com.github.alexeysol.geekregime.apicommons.generated.model.SpacePageResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.SpaceResponse;
import com.github.alexeysol.geekregime.apiposts.generated.api.SpaceApi;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.github.alexeysol.geekregime.apicommons.constant.Default.*;
import static com.github.alexeysol.geekregime.apiposts.shared.constant.PathConstant.*;

@RestController
@RequestMapping(path = API_PREFIX_V1, produces = "application/json")
@Validated
@RequiredArgsConstructor
public class SpaceController implements SpaceApi {
    private static final String CREATED_AT = "createdAt";
    private static final String ID = "id";
    private static final String USER_ID = "userId";
    private static final String POSTS = "posts";

    @Override
    public ResponseEntity<SpacePageResponse> findAllSpaces(
        List<String> searchIn,
        String text,
        @PageableDefault(size = PAGE_SIZE, sort = SORT_BY, direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return null;
    }

    @Override
    public ResponseEntity<SpaceResponse> findSpaceBySlug(String slug) {
        return null;
    }
}

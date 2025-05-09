package com.github.alexeysol.geekregime.apiposts.feature.space.controller.v1;

import com.github.alexeysol.geekregime.apicommons.constant.Default;
import com.github.alexeysol.geekregime.apicommons.exception.ResourceException;
import com.github.alexeysol.geekregime.apicommons.generated.model.*;
import com.github.alexeysol.geekregime.apiposts.shared.util.DataAccessHelper;
import com.github.alexeysol.geekregime.apiposts.shared.util.EntitySpecificationUtil;
import com.github.alexeysol.geekregime.apiposts.feature.space.mapper.SpaceMapper;
import com.github.alexeysol.geekregime.apiposts.feature.space.model.entity.Space;
import com.github.alexeysol.geekregime.apiposts.feature.space.service.SpaceService;
import com.github.alexeysol.geekregime.apiposts.generated.api.SpaceApi;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.github.alexeysol.geekregime.apicommons.constant.Default.*;
import static com.github.alexeysol.geekregime.apiposts.feature.post.constant.PostConstant.*;
import static com.github.alexeysol.geekregime.apiposts.shared.constant.PathConstant.*;

@RestController
@RequestMapping(path = API_PREFIX_V1, produces = "application/json")
@Validated
@RequiredArgsConstructor
public class SpaceController implements SpaceApi {
    private final SpaceService service;
    private final SpaceMapper mapper;

    @Override
    public ResponseEntity<SpacePageResponse> findAllSpaces(
        List<String> searchIn,
        String text,
        @PageableDefault(size = PAGE_SIZE, sort = SORT_BY, direction = Sort.Direction.DESC) Pageable pageable
    ) {
        var filterSpecification = EntitySpecificationUtil.<Space>byLikeIgnoreCaseSearchText(text, searchIn);

        Page<Space> spacePage = service.findAllSpaces(filterSpecification, pageable);
        var spaceResponseList = mapper.toSpaceResponseList(spacePage.getContent());
        var response = new SpacePageResponse(spaceResponseList, spacePage.getSize(), spacePage.getTotalElements());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<SpaceResponse> findSpaceBySlug(String slug) {
        var optionalSpace = service.findSpaceBySlug(slug);

        if (optionalSpace.isEmpty()) {
            throw new ResourceException(ErrorCode.ABSENT, SLUG_FIELD);
        }

        var space = optionalSpace.get();
        var response = mapper.toSpaceResponse(space);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<SpaceResponse>> saveSpaces(List<SaveSpaceRequest> requests) {
        var spacesToPersist = mapper.toSpaceList(requests);
        var savedSpaces = service.saveSpaceList(spacesToPersist);
        var response = mapper.toSpaceResponseList(savedSpaces);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<IdResponse> removeSpaceById(Long id) {
        var result = service.removeSpaceById(id);

        if (result == Default.NOT_FOUND_BY_ID) {
            throw new ResourceException(ErrorCode.ABSENT, ID_FIELD);
        }

        var response = DataAccessHelper.getIdResponse(id);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

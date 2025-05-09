package com.github.alexeysol.geekregime.apiaggregator.features.space.controller.v1;

import com.github.alexeysol.geekregime.apiaggregator.features.space.service.v1.SpaceService;
import com.github.alexeysol.geekregime.apicommons.generated.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static com.github.alexeysol.geekregime.apiaggregator.shared.constant.PathConstant.*;

@RestController
@RequestMapping(path = API_PREFIX_V1, produces = "application/json")
@Validated
@RequiredArgsConstructor
public class SpaceController {
    private final SpaceService service;

    @GetMapping("spaces")
    SpacePageResponse findAllSpaces(
        @RequestParam(required = false) Map<String, String> params
    ) {
        return service.findAllSpaces(params);
    }

    @GetMapping("spaces/{slug}")
    SpaceResponse findSlugBySlug(@PathVariable String slug) {
        return service.findSpaceBySlug(slug);
    }

    @PutMapping("spaces")
    List<SpaceResponse> saveSpaces(@RequestBody String request) throws Throwable {
        return service.saveSpaces(request);
    }

    @DeleteMapping("spaces/{id}")
    IdResponse removeSpaceById(@PathVariable long id) {
        return service.removeSpaceById(id);
    }
}

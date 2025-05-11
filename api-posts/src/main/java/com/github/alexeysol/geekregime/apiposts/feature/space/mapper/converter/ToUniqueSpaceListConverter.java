package com.github.alexeysol.geekregime.apiposts.feature.space.mapper.converter;

import com.github.alexeysol.geekregime.apicommons.generated.model.SaveSpaceRequest;
import com.github.alexeysol.geekregime.apiposts.feature.space.model.entity.Space;
import com.github.alexeysol.geekregime.apiposts.feature.space.service.SpaceService;
import org.modelmapper.AbstractConverter;
import org.modelmapper.ModelMapper;

import java.util.*;

import static java.util.stream.Collectors.collectingAndThen;
import static java.util.stream.Collectors.toCollection;

public class ToUniqueSpaceListConverter extends AbstractConverter<
    List<SaveSpaceRequest>,
    List<Space>
> {
    private final SpaceService spaceService;
    private final ModelMapper modelMapper;

    public ToUniqueSpaceListConverter(SpaceService spaceService, ModelMapper modelMapper) {
        this.spaceService = spaceService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected List<Space> convert(List<SaveSpaceRequest> sources) {
        var spaces = sources.stream()
            .map(source -> modelMapper.map(source, Space.class))
            .toList();

        return getUniqueSpaces(spaces);
    }

    private List<Space> getUniqueSpaces(List<Space> spaces) {
        if (Objects.isNull(spaces)) {
            return new ArrayList<>();
        }

        var spaceSlugs = spaces.stream().map(Space::getSlug).toList();
        var existingSpaces = spaceService.findAllSpacesBySlugs(spaceSlugs);

        var newSpaces = spaces.stream().filter(space ->
            existingSpaces.stream().noneMatch(existingSpace ->
                existingSpace.getSlug().equals(space.getSlug()))).toList();

        var spacesToPersist = new ArrayList<>(existingSpaces);
        spacesToPersist.addAll(newSpaces);

        return spacesToPersist.stream()
            .collect(collectingAndThen(toCollection(() -> new TreeSet<>(Comparator.comparing(Space::getSlug))),
                ArrayList::new));
    }
}

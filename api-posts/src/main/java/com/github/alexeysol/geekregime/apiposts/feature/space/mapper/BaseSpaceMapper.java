package com.github.alexeysol.geekregime.apiposts.feature.space.mapper;

import com.github.alexeysol.geekregime.apicommons.generated.model.SaveSpaceRequest;
import com.github.alexeysol.geekregime.apicommons.util.Slug;
import com.github.alexeysol.geekregime.apiposts.feature.space.mapper.converter.ToSpaceListConverter;
import com.github.alexeysol.geekregime.apiposts.feature.space.model.entity.Space;
import com.github.alexeysol.geekregime.apiposts.feature.space.service.SpaceService;
import lombok.Data;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;

import java.util.List;

public abstract class BaseSpaceMapper {
    protected final SpaceService spaceService;
    protected final ModelMapper modelMapper;

    public BaseSpaceMapper(SpaceService spaceService, ModelMapper modelMapper) {
        this.spaceService = spaceService;
        this.modelMapper = modelMapper;
        init(modelMapper);
    }

    @Data
    static protected class SaveSpaceRequestList {
        private List<SaveSpaceRequest> list;
    }

    @Data
    static protected class SpaceList {
        private List<Space> list;
    }

    private void init(ModelMapper modelMapper) {
        Converter<String, String> convertToSlug = context -> Slug.generateSlug(context.getSource());

        modelMapper.typeMap(SaveSpaceRequest.class, Space.class)
            .addMappings(mapper -> {
                mapper.using(convertToSlug)
                    .map(SaveSpaceRequest::getTitle, Space::setSlug);
            });

        modelMapper.createTypeMap(SaveSpaceRequestList.class, SpaceList.class)
            .addMappings(mapper -> mapper
                .using(new ToSpaceListConverter(spaceService, modelMapper))
                .map(SaveSpaceRequestList::getList, SpaceList::setList));
    }
}

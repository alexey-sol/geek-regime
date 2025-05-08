package com.github.alexeysol.geekregime.apiposts.feature.space.mapper;

import com.github.alexeysol.geekregime.apicommons.generated.model.SaveSpaceRequest;
import com.github.alexeysol.geekregime.apicommons.generated.model.SpaceResponse;
import com.github.alexeysol.geekregime.apiposts.feature.space.model.entity.Space;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class SpaceMapper extends BaseSpaceMapper {
    public SpaceMapper(ModelMapper modelMapper) {
        super(modelMapper);
    }

    public SpaceResponse toSpaceResponse(Space space) {
        return modelMapper.map(space, SpaceResponse.class);
    }

    public Space toSpace(SaveSpaceRequest request) {
        return modelMapper.map(request, Space.class);
    }
}

package com.github.alexeysol.geekregime.apiposts.feature.space.mapper;

import com.github.alexeysol.geekregime.apicommons.generated.model.SaveSpaceRequest;
import com.github.alexeysol.geekregime.apicommons.generated.model.SpaceResponse;
import com.github.alexeysol.geekregime.apiposts.feature.space.model.entity.Space;
import com.github.alexeysol.geekregime.apiposts.feature.space.service.SpaceService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SpaceMapper extends BaseSpaceMapper {
    public SpaceMapper(SpaceService spaceService, ModelMapper modelMapper) {
        super(spaceService, modelMapper);
    }

    public List<SpaceResponse> toSpaceResponseList(List<Space> spaces) {
        return spaces.stream()
            .map(this::toSpaceResponse)
            .toList();
    }

    public SpaceResponse toSpaceResponse(Space space) {
        return modelMapper.map(space, SpaceResponse.class);
    }

    public Space toSpace(SaveSpaceRequest request) {
        return modelMapper.map(request, Space.class);
    }

    public List<Space> toSpaceList(List<SaveSpaceRequest> saveSpaceRequests) {
        var requestList = new SaveSpaceRequestList();
        requestList.setList(saveSpaceRequests);
        return modelMapper.map(requestList, SpaceList.class).getList();
    }
}

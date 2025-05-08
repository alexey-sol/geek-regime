package com.github.alexeysol.geekregime.apiposts.feature.space.mapper;

import com.github.alexeysol.geekregime.apicommons.generated.model.SaveSpaceRequest;
import com.github.alexeysol.geekregime.apicommons.util.Slug;
import com.github.alexeysol.geekregime.apiposts.feature.space.model.entity.Space;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;

public abstract class BaseSpaceMapper {
    protected final ModelMapper modelMapper;

    public BaseSpaceMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
        init(modelMapper);
    }

    private void init(ModelMapper modelMapper) {
        Converter<String, String> convertToSlug = context -> Slug.generateSlug(context.getSource());

        modelMapper.typeMap(SaveSpaceRequest.class, Space.class)
            .addMappings(mapper -> mapper.using(convertToSlug)
                .map(SaveSpaceRequest::getTitle, Space::setSlug));
    }
}

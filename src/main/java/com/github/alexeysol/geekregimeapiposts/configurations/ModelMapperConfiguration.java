package com.github.alexeysol.geekregimeapiposts.configurations;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfiguration {
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        modelMapper.getConfiguration()
            .setSkipNullEnabled(true)
            .setPropertyCondition(Conditions.isNotNull());

        return modelMapper;
    }
}

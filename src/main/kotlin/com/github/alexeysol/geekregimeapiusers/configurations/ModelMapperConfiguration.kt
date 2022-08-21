package com.github.alexeysol.geekregimeapiusers.configurations

import org.modelmapper.Conditions
import org.modelmapper.ModelMapper
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class ModelMapperConfiguration {
    @Bean
    fun modelMapper(): ModelMapper {
        val modelMapper = ModelMapper()
        modelMapper.configuration.isSkipNullEnabled = true
        modelMapper.configuration.propertyCondition = Conditions.isNotNull()
        return modelMapper
    }
}

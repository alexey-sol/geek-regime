package com.github.alexeysol.geekregimeapiposts.models.mappers;

import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface PostMapper {
    @BeanMapping(
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        ignoreByDefault = true
    )
    @Mappings({
        @Mapping(target = "title", source ="title"),
        @Mapping(target = "body", source ="body")
    })
    void updatePost(Post postContent, @MappingTarget Post entity);
}

package com.github.alexeysol.geekregime.apiposts.feature.post.mapper.converters;

import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.PostComment;
import com.github.alexeysol.geekregime.apiposts.feature.post.service.v1.PostCommentService;
import org.modelmapper.AbstractConverter;

public class ParentIdToParentConverter extends AbstractConverter<Long, PostComment> {
    private final PostCommentService service;

    public ParentIdToParentConverter(PostCommentService service) {
        this.service = service;
    }

    @Override
    protected PostComment convert(Long parentId) {
        var optionalParent = service.findPostCommentById(parentId);

        return optionalParent.orElse(null);
    }
}

package com.github.alexeysol.geekregime.apiposts.feature.post.util;

import com.github.alexeysol.geekregime.apicommons.model.database.FilterSpecificationFactory;
import com.github.alexeysol.geekregime.apicommons.model.dto.query.FilterCriterion;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.PostFilterSpecification;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.Post;

public class PostFilterSpecificationFactory implements FilterSpecificationFactory<Post> {
    @Override
    public PostFilterSpecification createSpecification(FilterCriterion criterion) {
        return new PostFilterSpecification(criterion);
    }
}

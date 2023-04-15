package com.github.alexeysol.geekregime.apiposts.utils;

import com.github.alexeysol.geekregime.apicommons.models.database.FilterSpecificationFactory;
import com.github.alexeysol.geekregime.apicommons.models.dtos.query.FilterCriterion;
import com.github.alexeysol.geekregime.apiposts.models.PostFilterSpecification;
import com.github.alexeysol.geekregime.apiposts.models.entities.Post;

public class PostFilterSpecificationFactory implements FilterSpecificationFactory<Post> {
    @Override
    public PostFilterSpecification createSpecification(FilterCriterion criterion) {
        return new PostFilterSpecification(criterion);
    }
}

package com.github.alexeysol.geekregime.apiposts.models;

import com.github.alexeysol.geekregime.apicommons.models.dtos.query.FilterCriterion;
import com.github.alexeysol.geekregime.apicommons.models.utils.FilterSpecification;
import com.github.alexeysol.geekregime.apiposts.models.entities.Post;

public class PostFilterSpecification extends FilterSpecification<Post> {
    public PostFilterSpecification(FilterCriterion criterion) {
        super(criterion);
    }
}

package com.github.alexeysol.geekregime.apiposts.model;

import com.github.alexeysol.geekregime.apicommons.model.dto.query.FilterCriterion;
import com.github.alexeysol.geekregime.apicommons.model.util.FilterSpecification;
import com.github.alexeysol.geekregime.apiposts.model.entity.Post;

public class PostFilterSpecification extends FilterSpecification<Post> {
    public PostFilterSpecification(FilterCriterion criterion) {
        super(criterion);
    }
}

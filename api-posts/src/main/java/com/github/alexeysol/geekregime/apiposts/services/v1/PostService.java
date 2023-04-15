package com.github.alexeysol.geekregime.apiposts.services.v1;

import com.github.alexeysol.geekregime.apicommons.constants.Defaults;
import com.github.alexeysol.geekregime.apicommons.models.dtos.query.FilterCriterion;
import com.github.alexeysol.geekregime.apicommons.models.utils.EntityFilter;
import com.github.alexeysol.geekregime.apicommons.utils.database.FilterSpecificationUtils;
import com.github.alexeysol.geekregime.apiposts.models.entities.Post;
import com.github.alexeysol.geekregime.apiposts.repositories.PostRepository;
import com.github.alexeysol.geekregime.apiposts.utils.PostFilterSpecificationFactory;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import java.util.Optional;

@Service
@Validated
public class PostService {
    private final PostRepository repository;

    public PostService(PostRepository repository) {
        this.repository = repository;
    }

    public Page<Post> findAllPosts(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Page<Post> findAllPosts(
        Pageable pageable,
        EntityFilter<EntityFilter<FilterCriterion>> filter
    ) {
        var specificationUtils = new FilterSpecificationUtils<>(new PostFilterSpecificationFactory());
        var specification = specificationUtils.createCompositeSpecification(filter);
        return repository.findAll(specification, pageable);
    }

    public Optional<Post> findPostById(long id) {
        return repository.findById(id);
    }

    public Optional<Post> findPostBySlug(String slug) {
        return Optional.ofNullable(repository.findPostBySlug(slug));
    }

    @Transactional
    public Post savePost(Post post) {
        return repository.save(post);
    }

    public long removePostById(long id) {
        int deletedRowCount = repository.removePostById(id);
        boolean postIsDeleted = deletedRowCount > 0;

        if (postIsDeleted) {
            return id;
        }

        return Defaults.NOT_FOUND_BY_ID;
    }

    public boolean postAlreadyExists(String slug) {
        return repository.existsPostBySlug(slug);
    }
}

package com.github.alexeysol.geekregime.apiposts.service.v1;

import com.github.alexeysol.geekregime.apicommons.constant.Default;
import com.github.alexeysol.geekregime.apicommons.model.dto.query.FilterCriterion;
import com.github.alexeysol.geekregime.apicommons.model.util.EntityFilter;
import com.github.alexeysol.geekregime.apicommons.util.database.FilterSpecificationUtil;
import com.github.alexeysol.geekregime.apiposts.model.entities.Post;
import com.github.alexeysol.geekregime.apiposts.repository.PostRepository;
import com.github.alexeysol.geekregime.apiposts.util.PostFilterSpecificationFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import java.util.Optional;

@Service
@Validated
@RequiredArgsConstructor
public class PostService {
    private final PostRepository repository;

    public Page<Post> findAllPosts(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Page<Post> findAllPosts(
        Pageable pageable,
        EntityFilter<EntityFilter<FilterCriterion>> filter
    ) {
        var specificationUtils = new FilterSpecificationUtil<>(new PostFilterSpecificationFactory());
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

        return Default.NOT_FOUND_BY_ID;
    }

    public boolean postAlreadyExists(String slug) {
        return repository.existsPostBySlug(slug);
    }
}

package com.github.alexeysol.geekregime.apiposts.feature.space.service;

import com.github.alexeysol.geekregime.apiposts.feature.space.model.entity.Space;
import com.github.alexeysol.geekregime.apiposts.feature.space.repository.SpaceRepository;
import com.github.alexeysol.geekregime.apiposts.shared.model.HasExistsBySlug;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Optional;

@Service
@Validated
@RequiredArgsConstructor
public class SpaceService implements HasExistsBySlug {
    private final SpaceRepository repository;

    public Page<Space> findAllSpaces(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Optional<Space> findSpaceBySlug(String slug) {
        return Optional.ofNullable(repository.findSpaceBySlug(slug));
    }

    public List<Space> findAllSpacesBySlugs(List<String> slugs) {
        return repository.findAllBySlugIn(slugs);
    }

    @Override
    public boolean existsBySlug(String slug) {
        return repository.existsSpaceBySlug(slug);
    }
}

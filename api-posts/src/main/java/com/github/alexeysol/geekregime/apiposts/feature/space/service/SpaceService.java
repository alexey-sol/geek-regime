package com.github.alexeysol.geekregime.apiposts.feature.space.service;

import com.github.alexeysol.geekregime.apiposts.feature.space.model.entity.Space;
import com.github.alexeysol.geekregime.apiposts.feature.space.repository.SpaceRepository;
import com.github.alexeysol.geekregime.apiposts.shared.model.HasExistsBySlug;
import com.github.alexeysol.geekregime.apiposts.shared.util.DataAccessHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Optional;

@Service
@Validated
@RequiredArgsConstructor
public class SpaceService implements HasExistsBySlug {
    private final SpaceRepository repository;

    public Page<Space> findAllSpaces(Specification<Space> specification, Pageable pageable) {
        return repository.findAll(specification, pageable);
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

    @Transactional
    public List<Space> saveSpaceList(List<Space> spaces) {
        return spaces.stream()
            .map(this::saveSpace)
            .toList();
    }

    @Transactional
    public Space saveSpace(Space space) {
        return repository.save(space);
    }

    public long removeSpaceById(long id) {
        int deletedRowCount = repository.removeSpaceById(id);
        return DataAccessHelper.getMutationResult(id, deletedRowCount);
    }
}

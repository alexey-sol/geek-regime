package com.github.alexeysol.geekregime.apiposts.feature.space.repository;

import com.github.alexeysol.geekregime.apiposts.feature.space.model.entity.Space;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface SpaceRepository extends PagingAndSortingRepository<Space, Long>, JpaSpecificationExecutor<Space> {
    @Query("SELECT s FROM Space s WHERE s.slug = :slug")
    @Transactional
    Space findSpaceBySlug(String slug);

    @Query("DELETE FROM Space s WHERE s.id = :id")
    @Transactional
    @Modifying
    int removeSpaceById(long id);

    Boolean existsSpaceBySlug(String slug);

    List<Space> findAllBySlugIn(List<String> slugs);
}

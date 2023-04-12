package com.github.alexeysol.geekregime.apicommons.utils.search;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;
import java.util.List;

@NoRepositoryBean
public interface SearchableRepository<Entity, Id extends Serializable>
    extends JpaRepository<Entity, Id> {

    List<Entity> searchBy(
        String value,
        List<String> keys,
        int limit
    );
}

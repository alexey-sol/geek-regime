package com.github.alexeysol.geekregimeapicommons.utils.search;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;
import java.util.List;

@NoRepositoryBean
public interface SearchableRepository<Entity, Id extends Serializable>
    extends JpaRepository<Entity, Id> {

    List<Entity> searchBy(
        String term,
        List<String> fields,
        int limit
    );
}

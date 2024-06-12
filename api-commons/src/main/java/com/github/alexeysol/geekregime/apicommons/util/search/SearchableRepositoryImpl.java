package com.github.alexeysol.geekregime.apicommons.util.search;

import org.hibernate.search.engine.search.query.SearchResult;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.io.Serializable;
import java.util.List;

@Transactional
public class SearchableRepositoryImpl<Entity, Id extends Serializable>
    extends SimpleJpaRepository<Entity, Id>
    implements SearchableRepository<Entity, Id> {

    private final EntityManager entityManager;

    public SearchableRepositoryImpl(Class<Entity> domainClass, EntityManager entityManager) {
        super(domainClass, entityManager);
        this.entityManager = entityManager;
    }

    public SearchableRepositoryImpl(
        JpaEntityInformation<Entity, Id> entityInformation, EntityManager entityManager) {
        super(entityInformation, entityManager);
        this.entityManager = entityManager;
    }

    @Override
    public List<Entity> searchBy(
        String value,
        List<String> keys,
        int limit
    ) {
        SearchSession searchSession = Search.session(entityManager);
        String[] keysAsArray = keys.toArray(String[]::new);

        SearchResult<Entity> items = searchSession
            .search(getDomainClass())
            .where(predicate -> predicate.match()
                .fields(keysAsArray)
                .matching(value)
                .fuzzy(1))
            .fetch(limit);

        return items.hits();
    }
}

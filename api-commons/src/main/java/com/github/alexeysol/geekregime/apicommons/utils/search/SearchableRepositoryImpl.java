package com.github.alexeysol.geekregime.apicommons.utils.search;

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
        String term,
        List<String> fields,
        int limit
    ) {
        SearchSession searchSession = Search.session(entityManager);
        String[] fieldsAsArray = fields.toArray(String[]::new);

        SearchResult<Entity> items = searchSession
            .search(getDomainClass())
            .where(predicate -> predicate.match()
                .fields(fieldsAsArray)
                .matching(term)
                .fuzzy(1))
            .fetch(limit);

        return items.hits();
    }
}

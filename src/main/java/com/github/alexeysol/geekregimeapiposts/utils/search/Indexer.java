package com.github.alexeysol.geekregimeapiposts.utils.search;

import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.massindexing.MassIndexer;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Transactional
@Component
public class Indexer {
    private static final int THREAD_COUNT = 4;

    private final EntityManager entityManager;

    public Indexer(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public void indexPersistedData(String indexClassName) {
        try {
            SearchSession searchSession = Search.session(entityManager);
            Class<?> classToIndex = Class.forName(indexClassName);

            MassIndexer indexer = searchSession
                .massIndexer(classToIndex)
                .threadsToLoadObjects(THREAD_COUNT);

            indexer.startAndWait();
        } catch (ClassNotFoundException | InterruptedException exception) {
            throw new RuntimeException(exception);
        }
    }
}

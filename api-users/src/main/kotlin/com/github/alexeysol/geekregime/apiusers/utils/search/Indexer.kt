package com.github.alexeysol.geekregime.apiusers.utils.search

import org.hibernate.search.mapper.orm.Search
import org.hibernate.search.mapper.orm.massindexing.MassIndexer
import org.hibernate.search.mapper.orm.session.SearchSession
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import javax.persistence.EntityManager

@Transactional
@Component
class Indexer(private val entityManager: EntityManager) {
    companion object {
        private const val THREAD_COUNT = 4
    }

    fun indexPersistedData(indexClassName: String?) {
        try {
            val searchSession: SearchSession = Search.session(entityManager)
            val classToIndex = Class.forName(indexClassName)
            val indexer: MassIndexer = searchSession
                .massIndexer(classToIndex)
                .threadsToLoadObjects(THREAD_COUNT)
            indexer.startAndWait()
        } catch (exception: ClassNotFoundException) {
            throw RuntimeException(exception)
        } catch (exception: InterruptedException) {
            throw RuntimeException(exception)
        }
    }
}

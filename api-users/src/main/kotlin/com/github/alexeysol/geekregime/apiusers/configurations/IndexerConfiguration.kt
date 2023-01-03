package com.github.alexeysol.geekregime.apiusers.configurations

import com.github.alexeysol.geekregime.apiusers.utils.search.Indexer
import org.springframework.boot.ApplicationRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class IndexerConfiguration {
    @Bean
    fun buildIndex(indexer: Indexer): ApplicationRunner {
        return ApplicationRunner {
            indexer.indexPersistedData("com.github.alexeysol.geekregime.apiusers.models.entities.User")
        }
    }
}

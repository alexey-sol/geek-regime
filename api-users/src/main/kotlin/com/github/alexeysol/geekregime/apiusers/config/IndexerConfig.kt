package com.github.alexeysol.geekregime.apiusers.config

import com.github.alexeysol.geekregime.apiusers.util.search.Indexer
import org.springframework.boot.ApplicationRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class IndexerConfig {
    @Bean
    fun buildIndex(indexer: Indexer): ApplicationRunner {
        return ApplicationRunner {
            indexer.indexPersistedData("com.github.alexeysol.geekregime.apiusers.model.entity.User")
        }
    }
}

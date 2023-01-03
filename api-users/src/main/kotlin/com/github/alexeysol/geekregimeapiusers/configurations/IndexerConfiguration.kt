package com.github.alexeysol.geekregimeapiusers.configurations

import com.github.alexeysol.geekregimeapiusers.utils.search.Indexer
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class IndexerConfiguration {
    @Bean
    fun buildIndex(indexer: Indexer): ApplicationRunner {
        return ApplicationRunner {
            indexer.indexPersistedData("com.github.alexeysol.geekregimeapiusers.models.entities.User")
        }
    }
}

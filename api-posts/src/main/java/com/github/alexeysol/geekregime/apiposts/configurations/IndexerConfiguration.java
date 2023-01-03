package com.github.alexeysol.geekregime.apiposts.configurations;

import com.github.alexeysol.geekregime.apiposts.utils.search.Indexer;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class IndexerConfiguration {
    @Bean
    public ApplicationRunner buildIndex(Indexer indexer) {
        return (ApplicationArguments args) ->
            indexer.indexPersistedData("com.github.alexeysol.geekregime.apiposts.models.entities.Post");
    }
}

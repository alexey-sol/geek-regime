package com.github.alexeysol.geekregimeapiposts.configurations;

import com.github.alexeysol.geekregimeapiposts.utils.search.Indexer;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class IndexerConfiguration {
    @Bean
    public ApplicationRunner buildIndex(Indexer indexer) {
        return (ApplicationArguments args) ->
            indexer.indexPersistedData("com.github.alexeysol.geekregimeapiposts.models.entities.Post");
    }
}

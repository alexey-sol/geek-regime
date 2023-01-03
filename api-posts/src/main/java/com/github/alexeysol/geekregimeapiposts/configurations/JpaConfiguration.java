package com.github.alexeysol.geekregimeapiposts.configurations;

import com.github.alexeysol.geekregimeapicommons.utils.search.SearchableRepositoryImpl;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(
    basePackages = "com.github.alexeysol.geekregimeapiposts.repositories",
    repositoryBaseClass = SearchableRepositoryImpl.class
)
public class JpaConfiguration {}

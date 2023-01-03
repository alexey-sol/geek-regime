package com.github.alexeysol.geekregime.apiposts.configurations;

import com.github.alexeysol.geekregime.apicommons.utils.search.SearchableRepositoryImpl;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(
    basePackages = "com.github.alexeysol.geekregime.apiposts.repositories",
    repositoryBaseClass = SearchableRepositoryImpl.class
)
public class JpaConfiguration {}

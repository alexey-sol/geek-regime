package com.github.alexeysol.geekregime.apiusers.config

import com.github.alexeysol.geekregime.apicommons.util.search.SearchableRepositoryImpl
import org.springframework.context.annotation.Configuration
import org.springframework.data.jpa.repository.config.EnableJpaRepositories

@Configuration
@EnableJpaRepositories(
    basePackages = ["com.github.alexeysol.geekregime.apiusers.repository"],
    repositoryBaseClass = SearchableRepositoryImpl::class
)
class JpaConfig

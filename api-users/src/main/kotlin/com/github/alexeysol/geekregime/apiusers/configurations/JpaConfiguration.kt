package com.github.alexeysol.geekregime.apiusers.configurations

import com.github.alexeysol.geekregime.apicommons.utils.search.SearchableRepositoryImpl
import org.springframework.context.annotation.Configuration
import org.springframework.data.jpa.repository.config.EnableJpaRepositories

@Configuration
@EnableJpaRepositories(
    basePackages = ["com.github.alexeysol.geekregime.apiusers.repositories"],
    repositoryBaseClass = SearchableRepositoryImpl::class
)
class JpaConfiguration

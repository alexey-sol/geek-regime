package com.github.alexeysol.geekregimeapiusers.configurations

import com.github.alexeysol.geekregimeapicommons.utils.search.SearchableRepositoryImpl
import org.springframework.context.annotation.Configuration
import org.springframework.data.jpa.repository.config.EnableJpaRepositories

@Configuration
@EnableJpaRepositories(
    basePackages = ["com.github.alexeysol.geekregimeapiusers.repositories"],
    repositoryBaseClass = SearchableRepositoryImpl::class
)
class JpaConfiguration

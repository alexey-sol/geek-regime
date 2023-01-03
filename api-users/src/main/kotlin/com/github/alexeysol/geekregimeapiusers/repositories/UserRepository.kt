package com.github.alexeysol.geekregimeapiusers.repositories

import com.github.alexeysol.geekregimeapicommons.utils.search.SearchableRepository
import com.github.alexeysol.geekregimeapiusers.models.entities.User
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import javax.transaction.Transactional

private const val COUNT_USERS_QUERY = "SELECT COUNT(u) FROM User u"

@Repository
interface UserRepository : SearchableRepository<User, Long> {
    @Query(
        "SELECT u FROM User u LEFT JOIN FETCH u.details LEFT JOIN FETCH u.credentials",
        countQuery = COUNT_USERS_QUERY
    )
    fun findAllUsers(pageable: Pageable): Page<User>

    @Query(
        "SELECT u FROM User u LEFT JOIN FETCH u.details LEFT JOIN FETCH u.credentials " +
            "WHERE u.id IN :ids",
        countQuery = COUNT_USERS_QUERY
    )
    fun findAllUsersById(ids: List<Long>, pageable: Pageable): Page<User>

    @Query(
        "SELECT u FROM User u LEFT JOIN FETCH u.details LEFT JOIN FETCH u.credentials " +
            "WHERE u.id = :id",
        countQuery = COUNT_USERS_QUERY
    )
    fun findUserById(id: Long): User?

    @Query(
        "SELECT u FROM User u LEFT JOIN FETCH u.details LEFT JOIN FETCH u.credentials " +
            "WHERE u.email = :email",
        countQuery = COUNT_USERS_QUERY
    )
    fun findUserByEmail(email: String): User?

    @Query("DELETE FROM User u WHERE u.id = :id")
    @Transactional
    @Modifying
    fun removeUserById(id: Long): Int

    fun existsUserByEmail(email: String): Boolean
}

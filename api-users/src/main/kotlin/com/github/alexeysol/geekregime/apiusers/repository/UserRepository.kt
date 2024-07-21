package com.github.alexeysol.geekregime.apiusers.repository

import com.github.alexeysol.geekregime.apicommons.util.search.SearchableRepository
import com.github.alexeysol.geekregime.apiusers.model.entity.User
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.*
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

    @Query(
        "SELECT u FROM User u LEFT JOIN FETCH u.details LEFT JOIN FETCH u.credentials " +
            "WHERE u.slug = :slug",
        countQuery = COUNT_USERS_QUERY
    )
    fun findUserBySlug(slug: String): User?

    @Query("DELETE FROM User u WHERE u.id = :id")
    @Transactional
    @Modifying
    fun removeUserById(id: Long): Int

    fun existsUserByEmail(email: String): Boolean

    fun existsUserBySlug(slug: String): Boolean

    @Query("UPDATE User u SET u.lastSeenAt = :lastSeenAt WHERE u.id = :id")
    @Transactional
    @Modifying
    fun updateLastSeenAtByUserId(id: Long, lastSeenAt: Date)
}

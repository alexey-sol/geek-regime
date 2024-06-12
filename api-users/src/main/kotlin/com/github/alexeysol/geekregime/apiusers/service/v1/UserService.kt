package com.github.alexeysol.geekregime.apiusers.service.v1

import com.github.alexeysol.geekregime.apicommons.constant.Default
import com.github.alexeysol.geekregime.apicommons.model.dto.query.SearchCriteria
import com.github.alexeysol.geekregime.apiusers.model.entity.User
import com.github.alexeysol.geekregime.apiusers.repository.UserRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import javax.validation.Valid

@Service
class UserService(val repository: UserRepository) {
    fun findAllUsers(pageable: Pageable): Page<User> = repository.findAllUsers(pageable)

    fun findAllUsersById(ids: List<Long>, pageable: Pageable): Page<User> =
        repository.findAllUsersById(ids, pageable)

    fun searchUsers(searchCriteria: @Valid SearchCriteria, pageable: Pageable): Page<User> {
        val term = searchCriteria.value
        val fields = searchCriteria.keys
        val limit = searchCriteria.limit

        val users: List<User> = repository.searchBy(term, fields, limit)

        return PageImpl(users, pageable, users.size.toLong())
    }

    fun findUserById(id: Long): User? = repository.findUserById(id)

    fun findUserByEmail(email: String): User? = repository.findUserByEmail(email)

    fun findUserBySlug(slug: String): User? = repository.findUserBySlug(slug)

    @Transactional
    fun saveUser(user: User): User {
        return repository.save(user)
    }

    fun removeUserById(id: Long): Long {
        val deletedRowCount = repository.removeUserById(id)
        val userIsDeleted = deletedRowCount > 0
        return if (userIsDeleted) id else Default.NOT_FOUND_BY_ID
    }

    fun userByEmailExists(email: String): Boolean = repository.existsUserByEmail(email)

    fun userBySlugExists(slug: String): Boolean = repository.existsUserBySlug(slug)
}

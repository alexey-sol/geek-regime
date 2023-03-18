package com.github.alexeysol.geekregime.apiusers.services.v1

import com.github.alexeysol.geekregime.apicommons.constants.Defaults
import com.github.alexeysol.geekregime.apicommons.models.dtos.query.SearchByDto
import com.github.alexeysol.geekregime.apiusers.models.entities.User
import com.github.alexeysol.geekregime.apiusers.repositories.UserRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import javax.validation.Valid

@Service
class UserService(val repository: UserRepository, val credentialsService: CredentialsService) {
    fun findAllUsers(pageable: Pageable): Page<User> = repository.findAllUsers(pageable)

    fun findAllUsersById(ids: List<Long>, pageable: Pageable): Page<User> =
        repository.findAllUsersById(ids, pageable)

    fun searchUsers(searchByDto: @Valid SearchByDto, pageable: Pageable): Page<User> {
        val term = searchByDto.term
        val fields = searchByDto.fields
        val limit = searchByDto.limit

        val users: List<User> = repository.searchBy(term, fields, limit)

        return PageImpl(users, pageable, users.size.toLong())
    }

    fun findUserById(id: Long): User? = repository.findUserById(id)

    fun findUserByEmail(email: String): User? = repository.findUserByEmail(email)

    fun findUserBySlug(slug: String): User? = repository.findUserBySlug(slug)

    @Transactional
    fun createUser(user: User, password: String? = null): User {
        repository.save(user)
        password?.let { credentialsService.createCredentials(password, user) }
        return user
    }

    @Transactional
    fun updateUser(id: Long, user: User, newPassword: String? = null): User {
        repository.save(user)
        newPassword?.let { credentialsService.updateCredentials(newPassword, id, user) }
        return user
    }

    fun removeUserById(id: Long): Long {
        val deletedRowCount = repository.removeUserById(id)
        val userIsDeleted = deletedRowCount > 0
        return if (userIsDeleted) id else Defaults.NOT_FOUND_BY_ID
    }

    fun userByEmailExists(email: String): Boolean = repository.existsUserByEmail(email)

    fun userBySlugExists(slug: String): Boolean = repository.existsUserBySlug(slug)
}

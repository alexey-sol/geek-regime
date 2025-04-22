package com.github.alexeysol.geekregime.apiusers.controller.v1

import com.github.alexeysol.geekregime.apicommons.constant.Default.*
import com.github.alexeysol.geekregime.apicommons.exception.ResourceException
import com.github.alexeysol.geekregime.apicommons.generated.model.*
import com.github.alexeysol.geekregime.apiusers.constant.PathConstant.API_PREFIX_V1
import com.github.alexeysol.geekregime.apiusers.constant.UserConstant.EMAIL_FIELD
import com.github.alexeysol.geekregime.apiusers.constant.UserConstant.ID_FIELD
import com.github.alexeysol.geekregime.apiusers.constant.UserConstant.NEW_PASSWORD_FIELD
import com.github.alexeysol.geekregime.apiusers.constant.UserConstant.OLD_PASSWORD_FIELD
import com.github.alexeysol.geekregime.apiusers.constant.UserConstant.PASSWORD_FIELD
import com.github.alexeysol.geekregime.apiusers.constant.UserConstant.SEARCHABLE_FIELDS
import com.github.alexeysol.geekregime.apiusers.constant.UserConstant.SLUG_FIELD
import com.github.alexeysol.geekregime.apiusers.generated.api.UserApi
import com.github.alexeysol.geekregime.apiusers.mapper.UserMapper
import com.github.alexeysol.geekregime.apiusers.service.v1.UserService
import com.github.alexeysol.geekregime.apiusers.util.assertPassword
import com.github.alexeysol.geekregime.apiusers.util.assertPasswordsMatchIfNeeded
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.web.PageableDefault
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.util.*
import javax.validation.ConstraintViolationException

@RestController
@RequestMapping(path = [API_PREFIX_V1], produces = ["application/json"])
@Validated
class UserController(val service: UserService, val mapper: UserMapper) : UserApi {
    override fun authenticate(request: AuthenticateRequest): ResponseEntity<UserResponse> {
        val user = request.email?.let { service.findUserByEmail(it) }
            ?: throw ResourceException(ErrorCode.ABSENT, EMAIL_FIELD)

        try {
            assertPassword(request.password, user.credentials);
            user.id?.let { service.updateLastSeenAtByUserId(it) }
            val response = mapper.toUserResponse(user);

            return ResponseEntity(response, HttpStatus.OK);
        } catch (exception: IllegalArgumentException) {
            throw ResourceException(ErrorCode.MISMATCH, PASSWORD_FIELD)
        }
    }

    override fun findAllUsers(
        ids: MutableList<Long>?,
        searchIn: MutableList<String>?,
        text: String?,
        @PageableDefault(size = PAGE_SIZE, sort = [SORT_BY], direction = Sort.Direction.DESC) pageable: Pageable
    ): ResponseEntity<UserPageResponse> {
        try {
            val usersPage =
                if (ids !== null) service.findAllUsersById(ids, pageable)
                else if (text !== null) service.searchUsers(text, searchIn ?: SEARCHABLE_FIELDS, pageable)
                else service.findAllUsers(pageable)

            val userList = mapper.toUserListResponse(usersPage.content);
            val response = UserPageResponse(userList, usersPage.size, usersPage.totalElements)

            return ResponseEntity(response, HttpStatus.OK)
        } catch (exception: IllegalArgumentException) {
            throw ResourceException(HttpStatus.UNPROCESSABLE_ENTITY, exception.message);
        } catch (exception: ConstraintViolationException) {
            throw ResourceException(HttpStatus.UNPROCESSABLE_ENTITY, exception.message);
        }
    }

    override fun findUserByIdOrSlug(idOrSlug: String): ResponseEntity<UserResponse> {
        val assumeId = idOrSlug.toLongOrNull(10) !== null;

        val user = if (assumeId) {
            service.findUserById(idOrSlug.toLong())
                ?: throw ResourceException(ErrorCode.ABSENT, ID_FIELD)
        } else {
            service.findUserBySlug(idOrSlug)
                ?: throw ResourceException(ErrorCode.ABSENT, SLUG_FIELD)
        }

        val response = mapper.toUserResponse(user)

        return ResponseEntity(response, HttpStatus.OK)
    }

    override fun findUserByEmail(email: String): ResponseEntity<UserResponse> {
        val user = service.findUserByEmail(email)
            ?: throw ResourceException(ErrorCode.ABSENT, EMAIL_FIELD)
        val response = mapper.toUserResponse(user)

        return ResponseEntity(response, HttpStatus.OK)
    }

    override fun createUser(request: CreateUserRequest): ResponseEntity<UserResponse> {
        if (service.userByEmailExists(request.email)) {
            throw ResourceException(ErrorCode.ALREADY_EXISTS, EMAIL_FIELD)
        }

        val user = mapper.toUser(request)
        val createdUser = service.saveUser(user)
        val response = mapper.toUserResponse(createdUser)

        return ResponseEntity(response, HttpStatus.OK)
    }

    override fun updateUser(request: UpdateUserRequest, id: Long): ResponseEntity<UserResponse> {
        if (!isValidPassword(request.oldPassword, request.newPassword)) {
            throw ResourceException(ErrorCode.INVALID, NEW_PASSWORD_FIELD)
        }

        request.email?.let {
            if (service.userByEmailExists(it)) {
                throw ResourceException(ErrorCode.ALREADY_EXISTS, EMAIL_FIELD)
            }
        }

        val user = service.findUserById(id)
            ?: throw ResourceException(ErrorCode.ABSENT, ID_FIELD)

        try {
            assertPasswordsMatchIfNeeded(request.oldPassword, request.newPassword, user.credentials)
        } catch (exception: IllegalArgumentException) {
            throw ResourceException(ErrorCode.MISMATCH, OLD_PASSWORD_FIELD)
        }

        val entity = mapper.toUser(request, user)
        val updatedUser = service.saveUser(entity)
        val response = mapper.toUserResponse(updatedUser)

        return ResponseEntity(response, HttpStatus.OK)
    }

    private fun isValidPassword(oldPassword: String?, newPassword: String?): Boolean {
        oldPassword ?: newPassword ?: return true

        return newPassword != null;
    }

    override fun removeUserById(id: Long): ResponseEntity<IdResponse> {
        val result = service.removeUserById(id)
        val isNotFound = result == NOT_FOUND_BY_ID

        if (isNotFound) {
            throw ResourceException(ErrorCode.ABSENT, ID_FIELD)
        }

        val response = mapper.toIdResponse(id)

        return ResponseEntity(response, HttpStatus.OK)
    }

    override fun uploadUserPicture(id: Long, picture: MultipartFile): ResponseEntity<UserResponse> {
        val user = service.findUserById(id)
            ?: throw ResourceException(ErrorCode.ABSENT, ID_FIELD)

        val tempFile = convertMultipartFileToTempFile(picture)
        val imageUrl = service.saveUserPicture(tempFile)

        user.details.let {
            it?.image = imageUrl
            service.saveUser(user)
        }

        val response = mapper.toUserResponse(user)

        return ResponseEntity(response, HttpStatus.OK)
    }

    private fun convertMultipartFileToTempFile(originalFile: MultipartFile): File {
        val extension = originalFile.originalFilename?.substringAfterLast(".", "")
        val tempFileName = UUID.randomUUID().toString()

        val tempFile = File.createTempFile(tempFileName, ".$extension")
        tempFile.deleteOnExit()
        originalFile.transferTo(tempFile)

        return tempFile
    }
}

package com.github.alexeysol.geekregime.apiusers.service.v1

import com.github.alexeysol.geekregime.apicommons.constant.Default
import com.github.alexeysol.geekregime.apicommons.util.file.FileUtil
import com.github.alexeysol.geekregime.apicommons.util.file.ImageUtil
import com.github.alexeysol.geekregime.apicommons.util.storage.CloudObjectStorage
import com.github.alexeysol.geekregime.apiusers.constant.UserConstant.SEARCH_LIMIT
import com.github.alexeysol.geekregime.apiusers.model.entity.User
import com.github.alexeysol.geekregime.apiusers.repository.UserRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.awt.image.BufferedImage
import java.io.File
import java.util.*
import javax.imageio.ImageIO

@Service
class UserService(
    val repository: UserRepository,
    val cloudObjectStorage: CloudObjectStorage
) {
    companion object {
        private const val S3_BUCKET_NAME = "geek-regime-files"
        private const val S3_USER_PICTURES_DIR = "user-pictures"
        private const val PICTURE_MAX_WIDTH_PX = 200
        private const val PICTURE_MAX_HEIGHT_PX = 200
    }

    fun findAllUsers(pageable: Pageable): Page<User> = repository.findAllUsers(pageable)

    fun findAllUsersById(ids: List<Long>, pageable: Pageable): Page<User> =
        repository.findAllUsersById(ids, pageable)

    fun searchUsers(
        text: String,
        searchIn: List<String>,
        pageable: Pageable
    ): Page<User> {
        val users: List<User> = repository.searchBy(text, searchIn, SEARCH_LIMIT)

        return PageImpl(users, pageable, users.size.toLong())
    }

    fun findUserById(id: Long): User? = repository.findUserById(id)

    fun findUserByEmail(email: String): User? = repository.findUserByEmail(email)

    fun findUserBySlug(slug: String): User? = repository.findUserBySlug(slug)

    fun updateLastSeenAtByUserId(id: Long, lastSeenAt: Date = Date()) {
        repository.updateLastSeenAtByUserId(id, lastSeenAt)
    }

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

    fun saveUserPicture(picture: File): String? {
        if (Objects.isNull(picture.name)) {
            return null
        }

        val resultPicture = getResizedPicture(picture)

        val key = "$S3_USER_PICTURES_DIR/${picture.name}"
        val imageUrl = cloudObjectStorage.uploadFile(S3_BUCKET_NAME, key, resultPicture.path)

        picture.delete()
        resultPicture.delete()

        return imageUrl
    }

    private fun getResizedPicture(pictureFile: File): File {
        var resultPictureFile = pictureFile
        val image: BufferedImage = ImageIO.read(pictureFile)

        if (image.width > PICTURE_MAX_WIDTH_PX || image.height > PICTURE_MAX_HEIGHT_PX) {
            val resizedImage = ImageUtil.resizeImage(image, PICTURE_MAX_WIDTH_PX, PICTURE_MAX_HEIGHT_PX)
            resultPictureFile = FileUtil.createTempFile(pictureFile.extension)
            ImageIO.write(resizedImage, pictureFile.extension, resultPictureFile)
        }

        return resultPictureFile
    }

    fun removeUserPictureByUrl(url: String) {
        val key = getKeyFromUrl(url)

        if (key.isNotEmpty()) {
            cloudObjectStorage.deleteFile(S3_BUCKET_NAME, key)
        }
    }

    private fun getKeyFromUrl(url: String): String {
        val s3BaseUrl = cloudObjectStorage.getBaseUrl(S3_BUCKET_NAME)
        return url.substringAfterLast("$s3BaseUrl/", "")
    }
}

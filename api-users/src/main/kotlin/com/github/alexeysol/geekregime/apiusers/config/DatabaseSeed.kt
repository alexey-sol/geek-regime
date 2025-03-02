package com.github.alexeysol.geekregime.apiusers.config

import com.github.alexeysol.geekregime.apiusers.util.faker.FakeUser
import com.github.alexeysol.geekregime.apiusers.util.faker.generateCreatedAt
import com.github.alexeysol.geekregime.apiusers.util.faker.generateUpdatedAt
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.jdbc.core.JdbcTemplate
import java.time.Instant
import javax.persistence.EntityManager
import javax.sql.DataSource
import javax.transaction.Transactional

@Profile("seed-fake-data")
@Configuration
class DatabaseSeed {
    @Value("\${api-users.fake-user-count}")
    private val fakeUserCount: Int = 0

    @Autowired
    private val entityManager: EntityManager? = null

    @Autowired
    private val dataSource: DataSource? = null

    private val createdAtList: MutableList<Instant> = mutableListOf()

    private val updatedAtList: MutableList<Instant> = mutableListOf()

    private val lastSeenAtList: MutableList<Instant> = mutableListOf()

    @Bean
    @Transactional
    fun seedFakerData() {
        if (fakeUserCount == 0) {
            return
        }

        for (userId in 1..fakeUserCount) {
            insertUser(userId)
        }

        val jdbcTemplate = dataSource?.let { JdbcTemplate(it) };

        jdbcTemplate?.let {
            for (userId in 1..fakeUserCount) {
                updateDates(jdbcTemplate, userId)
            }
        }
    }

    private fun insertUser(userId: Int) {
        val createdAt = generateCreatedAt()

        createdAtList.add(createdAt)
        updatedAtList.add(generateUpdatedAt(createdAt))
        lastSeenAtList.add(generateUpdatedAt(createdAt))

        entityManager?.persist(FakeUser.generateUser(userId.toLong()));
    }

    private fun updateDates(jdbcTemplate: JdbcTemplate, userId: Int) { // [1]
        val dateIndex = userId - 1

        val createdAt = createdAtList[dateIndex]
        val updatedAt = updatedAtList[dateIndex]
        val lastSeenAt = lastSeenAtList[dateIndex]

        jdbcTemplate.update("""
            UPDATE users
            SET created_at = '$createdAt', updated_at = '$updatedAt', last_seen_at = '$lastSeenAt'
            WHERE id = $userId
        """.trimIndent())

        jdbcTemplate.update("""
            UPDATE details
            SET created_at = '$createdAt', updated_at = '$updatedAt'
            WHERE user_id = $userId
        """.trimIndent())
    }
}

// [1]. Entity's AuditingEntityListener doesn't allow us to set an arbitrary date in a field annotated
// with CreatedDate or LastModifiedDate. So here we're updating the records manually, bypassing the entity
// manager.
// We do this in a separate loop because, at it seems, related to User entities like Details, don't have
// enough time to be inserted if these queries are run immediately after persisting.

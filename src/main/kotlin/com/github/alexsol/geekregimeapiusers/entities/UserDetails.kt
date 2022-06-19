package com.github.alexsol.geekregimeapiusers.entities

import com.github.alexsol.geekregimeapiusers.constants.DatabaseConstants as Constants
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.Instant
import javax.persistence.*
import javax.validation.constraints.Size

@Entity
@Table(name = Constants.USER_DETAILS_TABLE)
@EntityListeners(AuditingEntityListener::class)
data class UserDetails(
    @Column(nullable = false)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int,

    @Column(length = 255)
    @field:Size(min = 1, message = "Name must not be blank")
    val name: String? = null,

    @Column(length = 255)
    @field:Size(min = 1, message = "Image must not be blank")
    val image: String? = null,

    @Column(name = "created_at", updatable = false)
    @CreatedDate
    var createdAt: Instant? = null,

    @Column(name = "updated_at")
    @LastModifiedDate
    val updatedAt: Instant? = null,
)

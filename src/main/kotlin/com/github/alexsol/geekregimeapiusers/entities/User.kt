package com.github.alexsol.geekregimeapiusers.entities

import com.github.alexsol.geekregimeapiusers.constants.DatabaseConstants as Constants
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.Instant
import javax.persistence.*

@Entity
@Table(name = Constants.USER_TABLE)
@EntityListeners(AuditingEntityListener::class)
data class User(
    @Column(nullable = false)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int,

    @Column(nullable = false, unique = true, length = 255)
    val email: String,

    @Column(name = "created_at", updatable = false)
    @CreatedDate
    var createdAt: Instant? = null,

    @Column(name = "updated_at")
    @LastModifiedDate
    var updatedAt: Instant? = null,

    @OneToOne(fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
    @JoinColumn(name = "details_id", nullable = false)
    val details: UserDetails,
)

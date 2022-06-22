package com.github.alexsol.geekregimeapiusers.entities

import com.fasterxml.jackson.annotation.JsonProperty
import com.github.alexsol.geekregimeapiusers.constants.DatabaseConstants as Constants
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.Instant
import javax.persistence.*
import javax.validation.Valid
import javax.validation.constraints.Email
import javax.validation.constraints.NotEmpty

@Entity
@Table(name = Constants.USERS_TABLE)
@EntityListeners(AuditingEntityListener::class)
data class User(
    @Column(nullable = false)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int,

    @Column(nullable = false, unique = true, length = 255)
    @field:NotEmpty(message = "Email is required")
    @field:Email(message = "Email must have valid format")
    val email: String,

    @Column(name = "created_at", updatable = false)
    @CreatedDate
    var createdAt: Instant? = null,

    @Column(name = "updated_at")
    @LastModifiedDate
    var updatedAt: Instant? = null,

    @PrimaryKeyJoinColumn
    @OneToOne(mappedBy = "user", cascade = [CascadeType.ALL])
    @field:Valid
    var details: Details? = null,

    @PrimaryKeyJoinColumn
    @OneToOne(mappedBy = "user")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private var credentials: Credentials? = null,
)

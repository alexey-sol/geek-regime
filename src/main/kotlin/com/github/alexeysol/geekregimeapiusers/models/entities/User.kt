package com.github.alexeysol.geekregimeapiusers.models.entities

import com.fasterxml.jackson.annotation.JsonProperty
import com.github.alexeysol.geekregimeapiusers.constants.DatabaseConstants
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.util.*
import javax.persistence.*
import javax.validation.Valid
import javax.validation.constraints.Email
import javax.validation.constraints.NotEmpty

@Entity
@Table(name = DatabaseConstants.USERS_TABLE)
@EntityListeners(AuditingEntityListener::class)
data class User(
    @Column(nullable = false)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    val id: Long? = null,

    @Column(nullable = false, unique = true, length = 255)
    @field:NotEmpty(message = "Email is required and must not be blank")
    @field:Email(message = "Email must have valid format")
    var email: String? = null,

    @Column(name = "created_at", updatable = false)
    @CreatedDate
    var createdAt: Date? = Date(),

    @Column(name = "updated_at")
    @LastModifiedDate
    var updatedAt: Date? = Date(),

    @PrimaryKeyJoinColumn
    @OneToOne(mappedBy = "user", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    @field:Valid
    var details: Details? = null,

    @PrimaryKeyJoinColumn
    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    var credentials: Credentials? = null,
)

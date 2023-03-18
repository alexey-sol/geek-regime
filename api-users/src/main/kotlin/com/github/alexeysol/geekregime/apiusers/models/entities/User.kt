package com.github.alexeysol.geekregime.apiusers.models.entities

import com.fasterxml.jackson.annotation.JsonProperty
import com.github.alexeysol.geekregime.apiusers.constants.DatabaseConstants
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.*
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.util.*
import javax.persistence.*
import javax.validation.Valid
import javax.validation.constraints.Email
import javax.validation.constraints.NotEmpty
import javax.validation.constraints.NotNull

@Entity
@Indexed
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

    @Column(nullable = false, unique = true, length = 255)
    @field:NotEmpty(message = "Slug is required and must not be blank")
    var slug: String? = null,

    @Column(name = "created_at", updatable = false)
    @CreatedDate
    var createdAt: Date? = Date(),

    @Column(name = "updated_at")
    @LastModifiedDate
    var updatedAt: Date? = Date(),

    @PrimaryKeyJoinColumn
    @IndexedEmbedded
    @AssociationInverseSide(inversePath = ObjectPath(PropertyValue(propertyName = "user")))
    @OneToOne(mappedBy = "user", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    @field:NotNull(message = "Details is required")
    @field:Valid
    var details: Details?,

    @PrimaryKeyJoinColumn
    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    var credentials: Credentials? = null,
)

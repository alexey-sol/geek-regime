package com.github.alexeysol.geekregime.apiusers.model.entity

import com.fasterxml.jackson.annotation.JsonProperty
import com.github.alexeysol.geekregime.apicommons.constant.Gender
import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import lombok.ToString
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.*
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.util.*
import javax.persistence.*
import javax.validation.Valid
import javax.validation.constraints.NotEmpty
import javax.validation.constraints.Size

@Entity
@Table(name = "details")
@EntityListeners(AuditingEntityListener::class)
@ToString(exclude = ["user"])
data class Details(
    @Column(length = 255)
    @FullTextField
    @field:NotEmpty(message = "Name is required and must not be blank")
    var name: String?,

    @Column(length = 255)
    @field:Size(min = 1, message = "Image must not be blank")
    var image: String? = null,

    @Column
    @Enumerated(EnumType.STRING)
    var gender: Gender? = null,

    @JoinColumn(name = "user_id", nullable = false)
    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @field:Valid
    private var user: User? = null,

    @Column(name = "user_id", nullable = false)
    @Id
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private val userId: Long? = null,

    @Column(name = "created_at", updatable = false)
    @CreatedDate
    var createdAt: Date? = Date(),

    @Column(name = "updated_at")
    @LastModifiedDate
    var updatedAt: Date? = Date(),
) {
    fun setUser(user: User) {
        this.user = user
    }
}

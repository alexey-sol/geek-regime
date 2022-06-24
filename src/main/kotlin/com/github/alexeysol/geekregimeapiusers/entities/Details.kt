package com.github.alexeysol.geekregimeapiusers.entities

import com.fasterxml.jackson.annotation.JsonProperty
import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import com.github.alexeysol.geekregimeapiusers.constants.DatabaseConstants as Constants
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.Instant
import javax.persistence.*
import javax.validation.Valid
import javax.validation.constraints.Size

@Entity
@Table(name = Constants.DETAILS_TABLE)
@EntityListeners(AuditingEntityListener::class)
data class Details(
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
    var updatedAt: Instant? = null,

    @JoinColumn(name = "user_id", nullable = false)
    @OneToOne
    @MapsId
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @field:Valid
    private var user: User? = null,

    @Column(name = "user_id", nullable = false)
    @Id
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    val userId: Int? = null,
) {
    fun setUser(user: User) {
        this.user = user
    }
}

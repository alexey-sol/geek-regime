package com.github.alexeysol.geekregime.apiusers.model.entity

import com.fasterxml.jackson.annotation.JsonProperty
import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import lombok.ToString
import javax.persistence.*
import javax.validation.Valid

@Entity
@Table(name = "credentials")
@ToString(exclude = ["user"])
data class Credentials(
    @Column(name = "hashed_password", nullable = false)
    var hashedPassword: ByteArray,

    @Column(nullable = false)
    var salt: ByteArray,

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
    val userId: Long? = null,
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Credentials

        if (userId != other.userId) return false

        return true
    }

    override fun hashCode(): Int = userId?.hashCode() ?: 0
}

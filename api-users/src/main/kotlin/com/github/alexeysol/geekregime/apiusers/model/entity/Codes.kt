package com.github.alexeysol.geekregime.apiusers.model.entity

import com.fasterxml.jackson.annotation.JsonProperty
import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import lombok.ToString
import javax.persistence.*
import javax.validation.Valid

@Entity
@Table(name = "codes")
@ToString(exclude = ["user"])
data class Codes(
    @Column(name = "email_confirmation")
    var emailConfirmation: String? = null,

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
)

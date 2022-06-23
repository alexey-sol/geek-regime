package com.github.alexsol.geekregimeapiusers.entities

import com.fasterxml.jackson.annotation.JsonProperty
import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import com.github.alexsol.geekregimeapiusers.constants.DatabaseConstants as Constants
import javax.persistence.*
import javax.validation.Valid

@Entity
@Table(name = Constants.CREDENTIALS_TABLE)
data class Credentials(
    @Column
    val hashedPassword: ByteArray, // TODO override methods

    @Column
    val salt: ByteArray,

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
)

package com.github.alexsol.geekregimeapiusers.entities

import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import com.github.alexsol.geekregimeapiusers.constants.DatabaseConstants as Constants
import javax.persistence.*

@Entity
@Table(name = Constants.CREDENTIALS_TABLE)
data class Credentials(
    @Column
    val hashedPassword: ByteArray, // TODO override methods

    @Column
    val salt: ByteArray,

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    val user: User,

    @Column(nullable = false)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null,
)

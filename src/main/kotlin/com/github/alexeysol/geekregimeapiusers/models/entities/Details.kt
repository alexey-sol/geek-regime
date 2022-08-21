package com.github.alexeysol.geekregimeapiusers.models.entities

import com.fasterxml.jackson.annotation.JsonProperty
import com.github.alexeysol.geekregimeapiusers.models.Gender
import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import com.github.alexeysol.geekregimeapiusers.constants.DatabaseConstants
import lombok.ToString
import javax.persistence.*
import javax.validation.Valid
import javax.validation.constraints.Size

@Entity
@Table(name = DatabaseConstants.DETAILS_TABLE)
@ToString(exclude = ["user"])
data class Details(
    @Column(length = 255)
    @field:Size(min = 1, message = "Name must not be blank")
    var name: String? = null,

    @Column(length = 255)
    @field:Size(min = 1, message = "Image must not be blank")
    var image: String? = null,

    @Column
    @Enumerated(EnumType.STRING)
    var gender: Gender? = null,

    @JoinColumn(name = "user_id", nullable = false)
    @OneToOne
    @MapsId
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @field:Valid
    private var user: User?,

    @Column(name = "user_id", nullable = false)
    @Id
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private val userId: Long? = null,
) {
    fun setUser(user: User) {
        this.user = user
    }
}

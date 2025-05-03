package com.github.alexeysol.geekregime.apiposts.feature.post.model.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "post_vote", indexes = {
    @Index(columnList = "post_id"),
    @Index(columnList = "user_id, post_id")
}, uniqueConstraints = @UniqueConstraint(columnNames={"user_id", "post_id"}))
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostVote {
    @Column(nullable = false)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @Setter(value = AccessLevel.NONE)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Post post;

    @Column(name = "user_id", nullable = false)
    @NotNull(message = "User ID is required")
    private long userId;

    @Column(nullable = false)
    @NotNull(message = "Value is required")
    private long value;
}

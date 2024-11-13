package com.github.alexeysol.geekregime.apiposts.model.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "post_comment", indexes = {
    @Index(columnList = "post_id"),
    @Index(columnList = "user_id, post_id")
})
@EntityListeners(AuditingEntityListener.class)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostComment {
    @Column(nullable = false)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @Setter(value = AccessLevel.NONE)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @Column(name = "post_id", insertable = false, updatable = false)
    private long postId; // [1]

    @Column(name = "user_id", nullable = false)
    @NotNull(message = "User ID is required")
    private long userId;

    @Column(nullable = false, columnDefinition = "TEXT")
    @NotEmpty(message = "Body is required and must not be blank")
    private String body;

    @Column(name = "created_at", updatable = false)
    @CreatedDate
    @Setter(value = AccessLevel.NONE)
    private Date createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    @Setter(value = AccessLevel.NONE)
    private Date updatedAt;
}

// [1]. It's a field specifically for a DTO. We don't need the whole post in a response DTO, so when
// mapping, we ignore "post" field and set this scalar "postId" field.

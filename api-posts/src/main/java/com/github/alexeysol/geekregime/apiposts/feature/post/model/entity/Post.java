package com.github.alexeysol.geekregime.apiposts.feature.post.model.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.github.alexeysol.geekregime.apiposts.feature.space.model.entity.Space;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "posts", indexes = {
    @Index(columnList = "user_id"),
    @Index(columnList = "title"),
    @Index(columnList = "excerpt"),
    @Index(columnList = "slug", unique = true),
    @Index(columnList = "created_at"),
    @Index(columnList = "updated_at")
})
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    @Column(nullable = false)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @Setter(value = AccessLevel.NONE)
    private long id;

    @Column(name = "user_id", nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull(message = "User ID is required")
    private long userId;

    @Column(nullable = false, columnDefinition = "TEXT")
    @NotEmpty(message = "Title is required and must not be blank")
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    @NotEmpty(message = "Body is required and must not be blank")
    private String body;

    @Column(nullable = false, columnDefinition = "TEXT")
    @NotEmpty(message = "Excerpt is required and must not be blank")
    private String excerpt;

    @Column(nullable = false, unique = true, columnDefinition = "TEXT")
    @NotEmpty(message = "Slug is required and must not be blank")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String slug;

    @Column(name = "created_at", updatable = false)
    @CreatedDate
    @Setter(value = AccessLevel.NONE)
    private Date createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    @Setter(value = AccessLevel.NONE)
    private Date updatedAt;

    @OneToOne(mappedBy = "post")
    @PrimaryKeyJoinColumn
    private PostMeta meta;

    @OneToMany(mappedBy = "post")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<PostVote> votes;

    @OneToMany(mappedBy = "post")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<PostComment> comments;

    @ManyToMany(cascade = { CascadeType.ALL }, fetch = FetchType.LAZY)
    @JoinTable(
        name = "post_space",
        joinColumns = {
            @JoinColumn(name = "post_id")
        },
        inverseJoinColumns = {
            @JoinColumn(name = "space_id")
        },
        indexes = {
            @Index(columnList = "post_id"),
            @Index(columnList = "space_id")
        }
    )
    private List<Space> spaces;
}

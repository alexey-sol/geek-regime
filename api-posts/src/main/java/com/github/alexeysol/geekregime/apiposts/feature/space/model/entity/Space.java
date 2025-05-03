package com.github.alexeysol.geekregime.apiposts.feature.space.model.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.Post;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "spaces", indexes = {
    @Index(columnList = "title"),
    @Index(columnList = "slug", unique = true),
})
@EntityListeners(AuditingEntityListener.class)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Space {
    @Column(nullable = false)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    @NotEmpty(message = "Title is required and must not be blank")
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    @NotEmpty(message = "Description is required and must not be blank")
    private String description;

    @Column(nullable = false, unique = true, columnDefinition = "TEXT")
    @NotEmpty(message = "Slug is required and must not be blank")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String slug;

    @Column(name = "is_custom")
    private Boolean isCustom = false;

    @Column(name = "created_at", updatable = false)
    @CreatedDate
    @Setter(value = AccessLevel.NONE)
    private Date createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    @Setter(value = AccessLevel.NONE)
    private Date updatedAt;

    @Column(name = "user_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private long userId;

    @ManyToMany(mappedBy = "spaces", fetch = FetchType.LAZY)
    private List<Post> posts;
}

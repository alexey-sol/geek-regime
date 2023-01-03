package com.github.alexeysol.geekregimeapiposts.models.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.github.alexeysol.geekregimeapiposts.constants.DatabaseConstants;
import lombok.*;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Indexed
@Table(name = DatabaseConstants.POSTS_TABLE)
@EntityListeners(AuditingEntityListener.class)
@Data
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

    @Column(name = "space_id", nullable = false)
    @NotNull(message = "Space ID is required")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private long spaceId;

    @Column(nullable = false)
    @FullTextField
    @NotEmpty(message = "Title is required and must not be blank")
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    @NotEmpty(message = "Body is required and must not be blank")
    private String body;

    @Column(nullable = false, columnDefinition = "TEXT")
    @FullTextField
    @NotEmpty(message = "Excerpt is required and must not be blank")
    private String excerpt;

    @Column(nullable = false, unique = true)
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
}

package com.github.alexeysol.geekregimeapiposts.models.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.github.alexeysol.geekregimeapiposts.constants.DatabaseConstants;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;

@Entity
@Table(name = DatabaseConstants.POSTS_TABLE)
@EntityListeners(AuditingEntityListener.class)
public class Post {
    @Column(nullable = false)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private long id;

    @Column(name = "user_id", nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull(message = "User ID must be present")
    private long userId;

    @Column(name = "space_id", nullable = false)
    @NotNull(message = "Space ID must be present")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private long spaceId;

    @Column(nullable = false)
    @NotNull(message = "Title must be present")
    @Size(min = 1, message = "Title must not be blank")
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    @NotNull(message = "Body must be present")
    @Size(min = 1, message = "Body must not be blank")
    private String body;

    @Column(nullable = false, unique = true)
    @NotNull(message = "Slug must be present")
    @Size(min = 1, message = "Slug must not be blank")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String slug;

    @Column(name = "created_at", updatable = false)
    @CreatedDate
    private Instant createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private Instant updatedAt;

    public long getId() {
        return id;
    }

    public long getUserId() {
        return userId;
    }

    public long getSpaceId() {
        return spaceId;
    }

    public String getTitle() {
        return title;
    }

    public String getBody() {
        return body;
    }

    public String getSlug() {
        return slug;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public void setSpaceId(long spaceId) {
        this.spaceId = spaceId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }
}

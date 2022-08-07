package com.github.alexeysol.geekregimeapiposts.models.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.github.alexeysol.geekregimeapiposts.constants.DatabaseConstants;
import com.github.alexeysol.geekregimeapiposts.utils.Slug;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
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
    private long userId;

    @Column(name = "space_id", nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private long spaceId;

    @Column(nullable = false)
    @Size(min = 1, message = "Title must not be blank")
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    @Size(min = 1, message = "Body must not be blank")
    private String body;

    @Column(nullable = false, unique = true)
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

    public void generateAndSetSlug() {
        setSlug(Slug.generateSlug(title));
    }

    public void attachSuffixToSlug() {
        String suffix = Slug.getSuffixFromHash(this);
        setSlug(slug + suffix);
    }
}

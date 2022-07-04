package com.github.alexeysol.geekregimeapiposts.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.github.alexeysol.geekregimeapiposts.constants.DatabaseConstants;
import com.github.alexeysol.geekregimeapiposts.utils.Slug;
import net.bytebuddy.utility.RandomString;
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
    private Integer id;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "space_id", nullable = false)
    private Integer spaceId;

    @Column(nullable = false)
    @Size(min = 1, message = "Title must not be blank")
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    @Size(min = 1, message = "Body must not be blank")
    private String body;

    @Column(nullable = false, unique = true, length = 255)
    @Size(min = 1, message = "Slug must not be blank")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String slug;

    @Column(name = "created_at", updatable = false)
    @CreatedDate
    private Instant createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private Instant updatedAt;

    public Integer getId() {
        return id;
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

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setSpaceId(Integer spaceId) {
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
        slug = Slug.generateSlug(title);
    }

    public void attachSuffixToSlug() {
        String suffix = Slug.getSlugSuffixFromHash(this);
        setSlug(slug + suffix);
    }
}

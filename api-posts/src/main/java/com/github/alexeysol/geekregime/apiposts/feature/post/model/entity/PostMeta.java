package com.github.alexeysol.geekregime.apiposts.feature.post.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "post_meta")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostMeta {
    @Id
    @Column(name = "post_id")
    private Long id;

    @OneToOne
    @MapsId
    private Post post;

    @Column
    private long rating;

    @Column(name = "view_count")
    private long viewCount;

    @Column(name = "comment_count")
    private long commentCount;

    public void incrementViewCount() {
        viewCount++;
    }
}

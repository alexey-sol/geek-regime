package com.github.alexeysol.geekregimeapiposts.services.v1;

import com.github.alexeysol.geekregimeapicommons.constants.DefaultValueConstants;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.repositories.PostRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class PostService {
    private final PostRepository db;

    public PostService(PostRepository db) {
        this.db = db;
    }

    public Page<Post> findAllPosts(Pageable pageable) {
        return db.findAll(pageable);
    }

    public Optional<Post> findPostById(long id) {
        return db.findById(id);
    }

    public Optional<Post> findPostBySlug(String slug) {
        return Optional.ofNullable(db.findPostBySlug(slug));
    }

    @Transactional
    public Post savePost(Post post) {
        return db.save(post);
    }

    public long removePostById(long id) {
        int deletedRowCount = db.removePostById(id);
        boolean postIsDeleted = deletedRowCount > 0;

        if (postIsDeleted) {
            return id;
        }

        return DefaultValueConstants.NOT_FOUND_BY_ID;
    }

    public boolean postAlreadyExists(String slug) {
        return db.existsPostBySlug(slug);
    }
}

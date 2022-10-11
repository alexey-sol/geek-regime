package com.github.alexeysol.geekregimeapiposts.services.v1;

import com.github.alexeysol.geekregimeapicommons.constants.DefaultsConstants;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.repositories.PostRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class PostService {
    private final PostRepository repository;

    public PostService(PostRepository repository) {
        this.repository = repository;
    }

    public Page<Post> findAllPosts(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Optional<Post> findPostById(long id) {
        return repository.findById(id);
    }

    public Optional<Post> findPostBySlug(String slug) {
        return Optional.ofNullable(repository.findPostBySlug(slug));
    }

    @Transactional
    public Post savePost(Post post) {
        return repository.save(post);
    }

    public long removePostById(long id) {
        int deletedRowCount = repository.removePostById(id);
        boolean postIsDeleted = deletedRowCount > 0;

        if (postIsDeleted) {
            return id;
        }

        return DefaultsConstants.NOT_FOUND_BY_ID;
    }

    public boolean postAlreadyExists(String slug) {
        return repository.existsPostBySlug(slug);
    }
}

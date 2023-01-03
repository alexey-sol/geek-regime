package com.github.alexeysol.geekregimeapiposts.services.v1;

import com.github.alexeysol.geekregimeapicommons.constants.Defaults;
import com.github.alexeysol.geekregimeapicommons.models.dtos.query.SearchByDto;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.repositories.PostRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Service
@Validated
public class PostService {
    private final PostRepository repository;

    public PostService(PostRepository repository) {
        this.repository = repository;
    }

    public Page<Post> findAllPosts(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Page<Post> searchPosts(@Valid SearchByDto searchByDto, Pageable pageable) {
        String term = searchByDto.getTerm();
        List<String> fields = searchByDto.getFields();
        int limit = searchByDto.getLimit();

        List<Post> posts = repository.searchBy(term, fields, limit);

        return new PageImpl(posts, pageable, posts.size());
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

        return Defaults.NOT_FOUND_BY_ID;
    }

    public boolean postAlreadyExists(String slug) {
        return repository.existsPostBySlug(slug);
    }
}

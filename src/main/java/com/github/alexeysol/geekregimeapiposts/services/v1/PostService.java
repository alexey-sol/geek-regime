package com.github.alexeysol.geekregimeapiposts.services.v1;

import com.github.alexeysol.geekregimeapiposts.entities.Post;
import com.github.alexeysol.geekregimeapiposts.repositories.PostRepository;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    private final PostRepository db;

    PostService(PostRepository db) {
        this.db = db;
    }

    public List<Post> findAllPosts() {
        Iterable<Post> iterable = db.findAll();
        return Streamable.of(iterable).toList();
    }

    public Optional<Post> findPostById(int id) {
        return db.findById(id);
    }

    public Post createPost(Post dto) {
        return db.save(dto);
    }

    public int removePostById(int id) {
        int deletedRowCount = db.removePostById(id);
        boolean postIsDeleted = deletedRowCount > 0;

        if (postIsDeleted) {
            return id;
        }

        return -1;
    }
}

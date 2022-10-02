package com.github.alexeysol.geekregimeapiposts.repositories.postrepository;

import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.repositories.PostRepository;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestEntityManager;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

@DataJpaTest
@AutoConfigureTestDatabase
@AutoConfigureTestEntityManager
public abstract class BasePostRepositoryTest {
    protected TestEntityManager entityManager;
    protected PostRepository postRepository;

    public BasePostRepositoryTest(
        TestEntityManager entityManager,
        PostRepository postRepository
    ) {
        this.entityManager = entityManager;
        this.postRepository = postRepository;
    }

    protected Post createPost(String title, String body, String excerpt, String slug) {
        Post post = new Post();
        post.setTitle(title);
        post.setBody(body);
        post.setExcerpt(excerpt);
        post.setSlug(slug);
        return post;
    }
}

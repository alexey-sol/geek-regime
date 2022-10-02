package com.github.alexeysol.geekregimeapiposts.repositories.postrepository;

import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.repositories.PostRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

public class FindPostBySlugTest extends BasePostRepositoryTest {
    public FindPostBySlugTest(
        @Autowired TestEntityManager entityManager,
        @Autowired PostRepository postRepository
    ) {
        super(entityManager, postRepository);
    }

    @Test
    public void givenPostExists_whenFindPostBySlug_thenReturnsPost() {
        String slug = "test-post";
        Post post = createPost("Test Post", "Hello World", "Test Post", slug);
        entityManager.persist(post);
        entityManager.flush();

        Post result = postRepository.findPostBySlug(slug);
        Assertions.assertEquals(post, result);
    }

    @Test
    public void givenPostDoesntExist_whenFindPostBySlug_thenReturnsNull() {
        String absentSlug = "test-post";

        Post result = postRepository.findPostBySlug(absentSlug);

        Assertions.assertNull(result);
    }
}

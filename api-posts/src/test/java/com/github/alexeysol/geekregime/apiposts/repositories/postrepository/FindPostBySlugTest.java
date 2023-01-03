package com.github.alexeysol.geekregime.apiposts.repositories.postrepository;

import com.github.alexeysol.geekregime.apiposts.models.entities.Post;
import com.github.alexeysol.geekregime.apiposts.repositories.PostRepository;
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
        Post post = Post.builder()
            .title("Test Post")
            .body("Hello World")
            .excerpt("Test Post")
            .slug("test-post")
            .build();
        entityManager.persist(post);
        entityManager.flush();

        Post result = postRepository.findPostBySlug(post.getSlug());
        Assertions.assertEquals(post, result);
    }

    @Test
    public void givenPostDoesntExist_whenFindPostBySlug_thenReturnsNull() {
        String absentSlug = "test-post";

        Post result = postRepository.findPostBySlug(absentSlug);

        Assertions.assertNull(result);
    }
}

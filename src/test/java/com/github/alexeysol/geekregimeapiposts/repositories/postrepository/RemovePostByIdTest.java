package com.github.alexeysol.geekregimeapiposts.repositories.postrepository;

import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.repositories.PostRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

public class RemovePostByIdTest extends BasePostRepositoryTest {
    public RemovePostByIdTest(
        @Autowired TestEntityManager entityManager,
        @Autowired PostRepository postRepository
    ) {
        super(entityManager, postRepository);
    }

    @Test
    public void givenPostExists_whenRemovePostById_thenReturnsDeletedRowCount1() {
        int deletedRowCount = 1;
        long initialPostId = 1L;
        Post post = new Post();
        post.setTitle("Test Post");
        post.setBody("Hello World");
        post.setSlug("test-post");
        entityManager.persist(post);
        entityManager.flush();

        int result = postRepository.removePostById(initialPostId);

        Assertions.assertEquals(deletedRowCount, result);
    }

    @Test
    public void givenPostDoesntExist_whenRemovePostById_thenReturnsDeletedRowCount0() {
        int deletedRowCount = 0;
        long absentUserId = 1L;

        int result = postRepository.removePostById(absentUserId);

        Assertions.assertEquals(deletedRowCount, result);
    }
}

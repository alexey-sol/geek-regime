package com.github.alexeysol.geekregime.apiposts.repository.postrepository;

import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.feature.post.repository.PostRepository;
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
        var deletedRowCount = 1;
        var post = Post.builder()
            .title("Test Post")
            .body("Hello World")
            .excerpt("Test Post")
            .slug("test-post")
            .build();
        entityManager.persist(post);
        entityManager.flush();

        var result = postRepository.removePostById(post.getId());
        Assertions.assertEquals(deletedRowCount, result);
    }

    @Test
    public void givenPostDoesntExist_whenRemovePostById_thenReturnsDeletedRowCount0() {
        var deletedRowCount = 0;
        var absentPostId = 10L;

        var result = postRepository.removePostById(absentPostId);
        Assertions.assertEquals(deletedRowCount, result);
    }
}

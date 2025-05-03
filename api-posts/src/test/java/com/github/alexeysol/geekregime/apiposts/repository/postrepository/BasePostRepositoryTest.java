package com.github.alexeysol.geekregime.apiposts.repository.postrepository;

import com.github.alexeysol.geekregime.apiposts.feature.post.repository.PostRepository;
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
}

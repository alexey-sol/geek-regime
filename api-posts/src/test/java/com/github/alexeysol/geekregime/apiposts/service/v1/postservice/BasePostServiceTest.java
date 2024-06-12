package com.github.alexeysol.geekregime.apiposts.service.v1.postservice;

import com.github.alexeysol.geekregime.apiposts.repository.PostRepository;
import com.github.alexeysol.geekregime.apiposts.service.v1.PostService;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;

@SpringBootTest
public abstract class BasePostServiceTest {
    @MockBean
    protected PostRepository postRepository;

    @SpyBean
    protected PostService postService;
}

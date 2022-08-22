package com.github.alexeysol.geekregimeapiposts.services.v1.postservice;

import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.repositories.PostRepository;
import com.github.alexeysol.geekregimeapiposts.services.v1.PostService;
import com.github.alexeysol.geekregimeapiposts.services.v1.UserService;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;

@SpringBootTest
public abstract class BasePostServiceTest {
    @MockBean
    protected PostRepository postRepository;

    @MockBean
    protected UserService userService;

    @SpyBean
    protected PostService postService;

    protected Post createPost(String title, String body) {
        Post post = new Post();
        post.setTitle(title);
        post.setBody(body);
        return post;
    }
}

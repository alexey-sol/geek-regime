package com.github.alexeysol.geekregimeapiposts.services.v1.postservice;

import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static com.github.alexeysol.geekregimeapiposts.testutils.Factories.createPost;
import static org.mockito.Mockito.when;

public class CreatePostTest extends BasePostServiceTest {
    @Test
    public void givenPostExists_whenSavePost_thenReturnsPost() {
        Post post = createPost("Test Post", "Hello World");

        when(postRepository.save(Mockito.any(Post.class))).thenReturn(post);

        Post result = postService.savePost(post);
        Assertions.assertEquals(post, result);
    }
}

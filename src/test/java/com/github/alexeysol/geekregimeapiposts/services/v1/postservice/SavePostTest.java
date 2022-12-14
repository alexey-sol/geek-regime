package com.github.alexeysol.geekregimeapiposts.services.v1.postservice;

import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.mockito.Mockito.when;

public class SavePostTest extends BasePostServiceTest {
    @Test
    public void givenPostExists_whenSavePost_thenReturnsPost() {
        Post post = Post.builder()
            .title("Test Post")
            .body("Hello World")
            .build();

        when(postRepository.save(Mockito.any(Post.class))).thenReturn(post);

        Post result = postService.savePost(post);
        Assertions.assertEquals(post, result);
    }
}

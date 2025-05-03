package com.github.alexeysol.geekregime.apiposts.service.v1.postservice;

import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.Post;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.mockito.Mockito.when;

public class SavePostTest extends BasePostServiceTest {
    @Test
    public void givenPostExists_whenSavePost_thenReturnsPost() {
        var post = Post.builder()
            .slug("slug")
            .title("Test Post")
            .body("Hello World")
            .excerpt("Hello World")
            .build();

        when(postRepository.save(Mockito.any(Post.class))).thenReturn(post);

        var result = postService.savePost(post);
        Assertions.assertEquals(post, result);
    }
}

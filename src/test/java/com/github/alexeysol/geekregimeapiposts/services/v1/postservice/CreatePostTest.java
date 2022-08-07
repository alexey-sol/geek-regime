package com.github.alexeysol.geekregimeapiposts.services.v1.postservice;

import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.utils.Slug;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import static org.mockito.Mockito.when;

@SpringBootTest
public class CreatePostTest extends BasePostServiceTest {
    @Test
    public void givenDtoHasNoSlug_whenCreatePost_thenReturnsPostWithGeneratedSlug() {
        Post post = new Post();
        post.setTitle("Test Post");
        post.setBody("Hello World");
        String expectedSlug = "test-post";
        when(postRepository.save(Mockito.any(Post.class))).thenReturn(post);

        Post result = postService.createPost(post);

        Assertions.assertEquals(post.getSlug(), expectedSlug);
        Assertions.assertEquals(post, result);
    }

    @Test
    public void givenDtoHasExistingSlug_whenCreatePost_thenReturnsPostWithModifiedSlug() {
        String initialSlug = "test-post";
        Post post = new Post();
        post.setTitle("Test Post");
        post.setBody("Hello World");
        post.setSlug(initialSlug);
        String expectedSlug = String.format("%s%s", initialSlug, Slug.getSuffixFromHash(post));
        when(postRepository.existsPostBySlug(initialSlug)).thenReturn(true);
        when(postRepository.save(Mockito.any(Post.class))).thenReturn(post);

        Post result = postService.createPost(post);

        Assertions.assertEquals(post.getSlug(), expectedSlug);
        Assertions.assertEquals(post, result);
    }
}

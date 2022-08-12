package com.github.alexeysol.geekregimeapiposts.controllers.v1.postcontroller;

import com.github.alexeysol.geekregimeapiposts.TestUtils;
import com.github.alexeysol.geekregimeapiposts.models.dtos.DetailedPost;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.models.mappers.User;
import com.github.alexeysol.geekregimeapiposts.sources.ApiPostsSourceResolver;
import org.hamcrest.CoreMatchers;
import org.hamcrest.MatcherAssert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.Objects;

import static org.mockito.Mockito.when;

public class PostPostTest extends BasePostControllerTest {
    public PostPostTest(
        @Autowired MockMvc mockMvc,
        @Autowired ApiPostsSourceResolver sourceResolver
    ) {
        super(mockMvc, sourceResolver);
    }

    @Test
    public void givenDtoIsValid_whenPostPost_thenReturnsDetailedPostWithStatus200()
    throws Exception {
        User author = new User();
        Post post = new Post();
        post.setTitle("Test Post");
        post.setBody("Hello World");
        DetailedPost detailedPost = new DetailedPost(post, author);

        when(postService.createPost(Mockito.any(Post.class))).thenReturn(post);
        when(postService.convertPostToDetailedPost(post)).thenReturn(detailedPost);

        mockMvc.perform(TestUtils.mockPostRequest(apiV1Path, post))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(result -> {
                String expected = TestUtils.objectToJsonString(detailedPost);
                String actual = result.getResponse().getContentAsString();
                Assertions.assertEquals(expected, actual);
            });
    }

    @Test
    public void givenDtoIsInvalid_whenPostPost_thenReturnsStatus400()
    throws Exception {
        User author = new User();
        Post post = new Post();
        post.setTitle("");
        post.setBody("");
        DetailedPost detailedPost = new DetailedPost(post, author);

        when(postService.createPost(Mockito.any(Post.class))).thenReturn(post);
        when(postService.convertPostToDetailedPost(post)).thenReturn(detailedPost);

        mockMvc.perform(TestUtils.mockPostRequest(apiV1Path, post))
            .andExpect(MockMvcResultMatchers.status().isBadRequest())
            .andExpect(result -> {
                Assertions.assertTrue(result.getResolvedException() instanceof MethodArgumentNotValidException);
            })
            .andExpect(result -> {
                MatcherAssert.assertThat(
                    Objects.requireNonNull(result.getResolvedException()).getMessage(),
                    CoreMatchers.containsString(VALIDATION_FAILED_MESSAGE)
                );
            });
        }
}

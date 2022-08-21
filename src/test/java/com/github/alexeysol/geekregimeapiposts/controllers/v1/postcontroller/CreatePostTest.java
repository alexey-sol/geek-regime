package com.github.alexeysol.geekregimeapiposts.controllers.v1.postcontroller;

import com.github.alexeysol.geekregimeapiposts.TestUtils;
import com.github.alexeysol.geekregimeapiposts.models.dtos.PostDto;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.models.dtos.UserDto;
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

public class CreatePostTest extends BasePostControllerTest {
    public CreatePostTest(
        @Autowired MockMvc mockMvc,
        @Autowired ApiPostsSourceResolver sourceResolver
    ) {
        super(mockMvc, sourceResolver);
    }

    @Test
    public void givenDtoIsValid_whenCreatePost_thenReturnsDetailedPostWithStatus200()
    throws Exception {
        UserDto author = new UserDto();
        Post post = new Post();
        post.setTitle("Test Post");
        post.setBody("Hello World");
        PostDto detailedPost = new PostDto(post, author);

        when(postService.createPost(Mockito.any(Post.class))).thenReturn(detailedPost);

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
    public void givenDtoIsInvalid_whenCreatePost_thenReturnsStatus400()
    throws Exception {
        UserDto author = new UserDto();
        Post post = new Post();
        post.setTitle("");
        post.setBody("");
        PostDto detailedPost = new PostDto(post, author);

        when(postService.createPost(Mockito.any(Post.class))).thenReturn(detailedPost);

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

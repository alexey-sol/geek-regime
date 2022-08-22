package com.github.alexeysol.geekregimeapiposts.controllers.v1.postcontroller;

import com.github.alexeysol.geekregimeapiposts.TestUtils;
import com.github.alexeysol.geekregimeapiposts.models.dtos.CreatePostDto;
import com.github.alexeysol.geekregimeapiposts.models.dtos.PostDto;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.utils.mappers.PostMapper;
import com.github.alexeysol.geekregimeapiposts.utils.sources.ApiPostsSourceResolver;
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
        @Autowired ApiPostsSourceResolver sourceResolver,
        @Autowired PostMapper postMapper
        ) {
        super(mockMvc, sourceResolver, postMapper);
    }

    @Test
    public void givenDtoIsValid_whenCreatePost_thenReturnsDtoWithStatus200()
        throws Exception {

        String title = "Test Post";
        String body = "Hello World";
        Post post = createPost(title, body);
        CreatePostDto createPostDto = createCreatePostDto(title, body);
        PostDto postDto = convertEntityToPostDto(post);

        when(postService.savePost(Mockito.any(Post.class))).thenReturn(post);

        mockMvc.perform(TestUtils.mockPostRequest(getUrl(), createPostDto))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(result -> {
                String expected = TestUtils.objectToJsonString(postDto);
                String actual = result.getResponse().getContentAsString();
                Assertions.assertEquals(expected, actual);
            });
    }

    @Test
    public void givenDtoIsInvalid_whenCreatePost_thenReturnsStatus400()
        throws Exception {

        String invalidTitle = "";
        String invalidBody = "";
        Post post = createPost(invalidTitle, invalidBody);
        CreatePostDto createPostDto = createCreatePostDto(invalidTitle, invalidBody);

        when(postService.savePost(Mockito.any(Post.class))).thenReturn(post);

        mockMvc.perform(TestUtils.mockPostRequest(getUrl(), createPostDto))
            .andExpect(MockMvcResultMatchers.status().isBadRequest())
            .andExpect(result -> {
                Assertions.assertTrue(result.getResolvedException() instanceof MethodArgumentNotValidException);
            })
            .andExpect(result -> MatcherAssert.assertThat(
                Objects.requireNonNull(result.getResolvedException()).getMessage(),
                CoreMatchers.containsString(VALIDATION_FAILED_MESSAGE)
            ));
    }
}

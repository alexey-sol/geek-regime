package com.github.alexeysol.geekregimeapiposts.controllers.v1.postcontroller;

import com.github.alexeysol.geekregimeapicommons.utils.Json;
import com.github.alexeysol.geekregimeapicommons.utils.TestUtils;
import com.github.alexeysol.geekregimeapiposts.models.dtos.CreatePostDto;
import com.github.alexeysol.geekregimeapiposts.models.dtos.PostDto;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.utils.sources.ApiPostsSourceResolver;
import org.hamcrest.CoreMatchers;
import org.hamcrest.MatcherAssert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
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
    public void givenDtoIsValid_whenCreatePost_thenReturnsDtoWithStatus200()
        throws Exception {

        String title = "Test Post";
        String body = "Hello World";
        Post post = createPost(title, body);
        CreatePostDto createPostDto = createCreatePostDto(title, body);
        PostDto postDto = createPostDto(title, body);

        when(postMapper.fromCreatePostDtoToPost(createPostDto)).thenReturn(post);
        when(postService.savePost(post)).thenReturn(post);
        when(postMapper.fromPostToPostDto(post)).thenReturn(postDto);

        mockMvc.perform(TestUtils.mockPostRequest(getUrl(), createPostDto))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(result -> {
                String expected = Json.stringify(postDto);
                String actual = result.getResponse().getContentAsString();
                Assertions.assertEquals(expected, actual);
            });
    }

    @Test
    public void givenDtoIsInvalid_whenCreatePost_thenReturnsStatus400()
        throws Exception {

        String invalidTitle = "";
        String invalidBody = "";
        CreatePostDto createPostDto = createCreatePostDto(invalidTitle, invalidBody);

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

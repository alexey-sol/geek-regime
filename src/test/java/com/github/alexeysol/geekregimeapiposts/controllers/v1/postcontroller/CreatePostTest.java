package com.github.alexeysol.geekregimeapiposts.controllers.v1.postcontroller;

import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceException;
import com.github.alexeysol.geekregimeapicommons.models.dtos.RawPostDto;
import com.github.alexeysol.geekregimeapicommons.utils.Json;
import com.github.alexeysol.geekregimeapicommons.utils.TestUtils;
import com.github.alexeysol.geekregimeapiposts.models.dtos.CreatePostDto;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.utils.sources.ApiPostsSource;
import org.hamcrest.CoreMatchers;
import org.hamcrest.MatcherAssert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.Objects;

import static com.github.alexeysol.geekregimeapiposts.testutils.Factories.*;
import static org.mockito.Mockito.when;

public class CreatePostTest extends BasePostControllerTest {
    public CreatePostTest(
        @Autowired MockMvc mockMvc,
        @Autowired ApiPostsSource source
    ) {
        super(mockMvc, source);
    }

    @Test
    public void givenDtoIsValid_whenCreatePost_thenReturnsDtoWithStatus200()
        throws Exception {

        long userId = 1L;
        long spaceId = 1L;
        String title = "Test Post";
        String body = "Hello World";

        Post post = createPost(userId, spaceId, title, body);
        CreatePostDto createPostDto = createCreatePostDto(userId, spaceId, title, body);
        RawPostDto rawPostDto = createRawPostDto(title, body);

        when(postMapper.fromCreatePostDtoToPost(createPostDto)).thenReturn(post);
        when(postService.savePost(post)).thenReturn(post);
        when(postMapper.fromPostToRawPostDto(post)).thenReturn(rawPostDto);

        mockMvc.perform(TestUtils.mockPostRequest(getUrl(), createPostDto))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(result -> {
                String expected = Json.stringify(rawPostDto);
                String actual = result.getResponse().getContentAsString();
                Assertions.assertEquals(expected, actual);
            });
    }

    @Test
    public void givenDtoIsInvalid_whenCreatePost_thenReturnsStatus422()
        throws Exception {

        String invalidTitle = "";
        CreatePostDto createPostDto = createCreatePostDto(1L, 1L, invalidTitle, "Hello World");

        mockMvc.perform(TestUtils.mockPostRequest(getUrl(), createPostDto))
            .andExpect(MockMvcResultMatchers.status().isUnprocessableEntity())
            .andExpect(result -> {
                Assertions.assertTrue(result.getResolvedException() instanceof MethodArgumentNotValidException);
            })
            .andExpect(result -> MatcherAssert.assertThat(
                Objects.requireNonNull(result.getResolvedException()).getMessage(),
                CoreMatchers.containsString(VALIDATION_FAILED_MESSAGE)
            ));
    }

    @Test
    public void givenDtoIsValidButUserDoesntExist_whenCreatePost_thenReturnsStatus404()
        throws Exception {

        long absentUserId = 10L;
        long spaceId = 1L;
        String title = "Test Post";
        String body = "Hello World";

        Post post = createPost(absentUserId, spaceId, title, body);
        CreatePostDto createPostDto = createCreatePostDto(absentUserId, spaceId, title, body);

        when(postMapper.fromCreatePostDtoToPost(createPostDto)).thenReturn(post);
        when(postService.savePost(post)).thenReturn(post);
        when(postMapper.fromPostToRawPostDto(post))
            .thenThrow(new ResourceException(HttpStatus.NOT_FOUND, "huh?"));

        mockMvc.perform(TestUtils.mockPostRequest(getUrl(), createPostDto))
            .andExpect(MockMvcResultMatchers.status().isNotFound())
            .andExpect(result -> {
                Assertions.assertTrue(result.getResolvedException() instanceof ResourceException);
            });
    }
}

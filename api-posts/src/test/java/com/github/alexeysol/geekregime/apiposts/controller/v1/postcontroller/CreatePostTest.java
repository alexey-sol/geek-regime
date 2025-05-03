package com.github.alexeysol.geekregime.apiposts.controller.v1.postcontroller;

import com.github.alexeysol.geekregime.apicommons.exception.ResourceException;
import com.github.alexeysol.geekregime.apicommons.generated.model.CreatePostRequest;
import com.github.alexeysol.geekregime.apicommons.generated.model.BasePostDetailsResponse;
import com.github.alexeysol.geekregime.apicommons.util.TestUtil;
import com.github.alexeysol.geekregime.apicommons.util.parser.Json;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.PostMeta;
import com.github.alexeysol.geekregime.apiposts.shared.source.ApiPostsSource;
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

import static org.mockito.Mockito.when;

public class CreatePostTest extends BasePostControllerTest {
    public CreatePostTest(
        @Autowired MockMvc mockMvc,
        @Autowired ApiPostsSource source
    ) {
        super(mockMvc, source);
    }

    @Test
    public void givenRequestIsValid_whenCreatePost_thenReturnsResponseWithStatus200()
        throws Exception {

        var post = Post.builder()
            .userId(1L)
            .title("Test Post")
            .body("Hello World")
            .meta(new PostMeta())
            .build();
        var createPostRequest = CreatePostRequest.builder()
            .authorId(post.getUserId())
            .title(post.getTitle())
            .body(post.getBody())
            .build();
        var postDetailsResponse = BasePostDetailsResponse.builder()
            .title(post.getTitle())
            .body(post.getBody())
            .build();

        when(mapper.toPost(createPostRequest)).thenReturn(post);
        when(service.savePost(post)).thenReturn(post);
        when(mapper.toBasePostDetailsResponse(post)).thenReturn(postDetailsResponse);

        mockMvc.perform(TestUtil.mockPostRequest(getUrl(), createPostRequest))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(result -> {
                String expected = Json.stringify(postDetailsResponse);
                String actual = result.getResponse().getContentAsString();
                Assertions.assertEquals(expected, actual);
            });
    }

    @Test
    public void givenRequestIsInvalid_whenCreatePost_thenReturnsStatus422()
        throws Exception {

        var invalidTitle = "";

        var createPostRequest = CreatePostRequest.builder()
            .authorId(1L)
            .title(invalidTitle)
            .body("Hello World")
            .build();

        mockMvc.perform(TestUtil.mockPostRequest(getUrl(), createPostRequest))
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
    public void givenRequestIsValidButUserDoesntExist_whenCreatePost_thenReturnsStatus404()
        throws Exception {

        var absentUserId = 10L;

        var post = Post.builder()
            .userId(absentUserId)
            .title("Test Post")
            .body("Hello World")
            .meta(new PostMeta())
            .build();
        var createPostRequest = CreatePostRequest.builder()
            .authorId(post.getUserId())
            .title(post.getTitle())
            .body(post.getBody())
            .build();

        when(mapper.toPost(createPostRequest)).thenReturn(post);
        when(service.savePost(post)).thenReturn(post);
        when(mapper.toBasePostDetailsResponse(post))
            .thenThrow(new ResourceException(HttpStatus.NOT_FOUND, "huh?"));

        mockMvc.perform(TestUtil.mockPostRequest(getUrl(), createPostRequest))
            .andExpect(MockMvcResultMatchers.status().isNotFound())
            .andExpect(result -> {
                Assertions.assertTrue(result.getResolvedException() instanceof ResourceException);
            });
    }
}

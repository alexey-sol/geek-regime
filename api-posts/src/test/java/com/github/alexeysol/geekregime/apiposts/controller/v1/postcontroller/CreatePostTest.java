package com.github.alexeysol.geekregime.apiposts.controller.v1.postcontroller;

import com.github.alexeysol.geekregime.apicommons.exception.ResourceException;
import com.github.alexeysol.geekregime.apicommons.generated.model.PostDetailsResponse;
import com.github.alexeysol.geekregime.apicommons.util.TestUtil;
import com.github.alexeysol.geekregime.apicommons.util.parser.Json;
import com.github.alexeysol.geekregime.apiposts.generated.model.CreatePostRequest;
import com.github.alexeysol.geekregime.apiposts.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.util.source.ApiPostsSource;
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
    public void givenDtoIsValid_whenCreatePost_thenReturnsDtoWithStatus200()
        throws Exception {

        var post = Post.builder()
            .userId(1L)
            .spaceId(1L)
            .title("Test Post")
            .body("Hello World")
            .build();
        var request = CreatePostRequest.builder()
            .authorId(post.getUserId())
            .spaceId(post.getSpaceId())
            .title(post.getTitle())
            .body(post.getBody())
            .build();
        var response = PostDetailsResponse.builder()
            .title(post.getTitle())
            .body(post.getBody())
            .build();

        when(mapper.toPost(request)).thenReturn(post);
        when(service.savePost(post)).thenReturn(post);
        when(mapper.toPostDetailsResponse(post)).thenReturn(response);

        mockMvc.perform(TestUtil.mockPostRequest(getUrl(), request))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(result -> {
                String expected = Json.stringify(response);
                String actual = result.getResponse().getContentAsString();
                Assertions.assertEquals(expected, actual);
            });
    }

    @Test
    public void givenDtoIsInvalid_whenCreatePost_thenReturnsStatus422()
        throws Exception {

        var invalidTitle = "";

        var request = CreatePostRequest.builder()
            .authorId(1L)
            .spaceId(1L)
            .title(invalidTitle)
            .body("Hello World")
            .build();

        mockMvc.perform(TestUtil.mockPostRequest(getUrl(), request))
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

        var absentUserId = 10L;

        var post = Post.builder()
            .userId(absentUserId)
            .spaceId(1L)
            .title("Test Post")
            .body("Hello World")
            .build();
        var request = CreatePostRequest.builder()
            .authorId(post.getUserId())
            .spaceId(post.getSpaceId())
            .title(post.getTitle())
            .body(post.getBody())
            .build();

        when(mapper.toPost(request)).thenReturn(post);
        when(service.savePost(post)).thenReturn(post);
        when(mapper.toPostDetailsResponse(post))
            .thenThrow(new ResourceException(HttpStatus.NOT_FOUND, "huh?"));

        mockMvc.perform(TestUtil.mockPostRequest(getUrl(), request))
            .andExpect(MockMvcResultMatchers.status().isNotFound())
            .andExpect(result -> {
                Assertions.assertTrue(result.getResolvedException() instanceof ResourceException);
            });
    }
}

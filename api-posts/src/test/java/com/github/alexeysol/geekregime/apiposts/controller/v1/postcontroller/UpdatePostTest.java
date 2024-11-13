package com.github.alexeysol.geekregime.apiposts.controller.v1.postcontroller;

import com.github.alexeysol.geekregime.apicommons.exception.ResourceException;
import com.github.alexeysol.geekregime.apicommons.generated.model.BasePostDetailsResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.UpdatePostRequest;
import com.github.alexeysol.geekregime.apicommons.util.TestUtil;
import com.github.alexeysol.geekregime.apicommons.util.parser.Json;
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
import java.util.Optional;

import static org.mockito.Mockito.when;

public class UpdatePostTest extends BasePostControllerTest {
    public UpdatePostTest(
        @Autowired MockMvc mockMvc,
        @Autowired ApiPostsSource source
    ) {
        super(mockMvc, source);
    }

    @Test
    public void givenRequestIsValid_whenUpdatePost_thenReturnsResponseWithStatus200()
        throws Exception {

        var postId = 1L;

        var post = Post.builder()
            .userId(1L)
            .spaceId(1L)
            .title("Test Post")
            .body("Hello World")
            .build();
        var updatePostRequest = UpdatePostRequest.builder()
            .title(post.getTitle())
            .body(post.getBody())
            .build();
        var postDetailsResponse = BasePostDetailsResponse.builder()
            .title(post.getTitle())
            .body(post.getBody())
            .build();

        when(service.findPostById(postId)).thenReturn(Optional.of(post));
        when(mapper.toPost(updatePostRequest, post)).thenReturn(post);
        when(service.savePost(post)).thenReturn(post);
        when(mapper.toBasePostDetailsResponse(post)).thenReturn(postDetailsResponse);

        mockMvc.perform(TestUtil.mockPatchRequest(getUrl(postId), updatePostRequest))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(result -> {
                String expected = Json.stringify(postDetailsResponse);
                String actual = result.getResponse().getContentAsString();
                Assertions.assertEquals(expected, actual);
            });
    }

    @Test
    public void givenRequestIsValidButPostDoesntExist_whenUpdatePost_thenReturnsStatus404()
        throws Exception {

        var absentId = 10L;

        var updatePostRequest = UpdatePostRequest.builder()
            .title("Test Post")
            .body("Hello World")
            .build();

        when(service.findPostById(absentId))
            .thenThrow(new ResourceException(HttpStatus.NOT_FOUND, "whuh?"));

        mockMvc.perform(TestUtil.mockPatchRequest(getUrl(absentId), updatePostRequest))
            .andExpect(MockMvcResultMatchers.status().isNotFound())
            .andExpect(result ->
                Assertions.assertTrue(result.getResolvedException() instanceof ResourceException)
            );
    }

    @Test
    public void givenRequestIsInvalid_whenUpdatePost_thenReturnsStatus400()
        throws Exception {

        var postId = 1L;
        var invalidBody = "";

        var updatePostRequest = UpdatePostRequest.builder()
            .title("Test Post")
            .body(invalidBody)
            .build();

        mockMvc.perform(TestUtil.mockPatchRequest(getUrl(postId), updatePostRequest))
            .andExpect(MockMvcResultMatchers.status().isUnprocessableEntity())
            .andExpect(result ->
                Assertions.assertTrue(result.getResolvedException() instanceof MethodArgumentNotValidException)
            )
            .andExpect(result -> MatcherAssert.assertThat(
                Objects.requireNonNull(result.getResolvedException()).getMessage(),
                CoreMatchers.containsString(VALIDATION_FAILED_MESSAGE)
            ));
    }
}

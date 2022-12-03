package com.github.alexeysol.geekregimeapiposts.controllers.v1.postcontroller;

import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceException;
import com.github.alexeysol.geekregimeapicommons.models.dtos.PostDetailsDto;
import com.github.alexeysol.geekregimeapicommons.utils.Json;
import com.github.alexeysol.geekregimeapicommons.utils.TestUtils;
import com.github.alexeysol.geekregimeapiposts.models.dtos.UpdatePostDto;
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
import java.util.Optional;

import static com.github.alexeysol.geekregimeapiposts.testutils.Factories.*;
import static org.mockito.Mockito.when;

public class UpdatePostTest extends BasePostControllerTest {
    public UpdatePostTest(
        @Autowired MockMvc mockMvc,
        @Autowired ApiPostsSource source
    ) {
        super(mockMvc, source);
    }

    @Test
    public void givenDtoIsForExistingPost_whenUpdatePost_thenReturnsDtoWithStatus200()
        throws Exception {

        long postId = 1L;
        String title = "Test Post";
        String body = "Hello World";
        Post post = createPost(1L, 1L, title, body);
        UpdatePostDto updatePostDto = createUpdatePostDto(title, body);
        PostDetailsDto detailsDto = createDetailsDto(title, body);

        when(postService.findPostById(postId)).thenReturn(Optional.of(post));
        when(postMapper.mapUpdatePostDtoToPost(updatePostDto, post)).thenReturn(post);
        when(postService.savePost(post)).thenReturn(post);
        when(postMapper.fromPostToPostDetailsDto(post)).thenReturn(detailsDto);

        mockMvc.perform(TestUtils.mockPatchRequest(getUrl(postId), updatePostDto))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(result -> {
                String expected = Json.stringify(detailsDto);
                String actual = result.getResponse().getContentAsString();
                Assertions.assertEquals(expected, actual);
            });
    }

    @Test
    public void givenDtoIsForAbsentPost_whenUpdatePost_thenReturnsStatus404()
        throws Exception {

        long absentId = 10L;
        UpdatePostDto updatePostDto = createUpdatePostDto("Test Post", "Hello World");

        when(postService.findPostById(absentId))
            .thenThrow(new ResourceException(HttpStatus.NOT_FOUND, "whuh?"));

        mockMvc.perform(TestUtils.mockPatchRequest(getUrl(absentId), updatePostDto))
            .andExpect(MockMvcResultMatchers.status().isNotFound())
            .andExpect(result ->
                Assertions.assertTrue(result.getResolvedException() instanceof ResourceException)
            );
    }

    @Test
    public void givenDtoIsInvalid_whenUpdatePost_thenReturnsStatus400()
        throws Exception {

        long postId = 1L;
        String invalidBody = "";
        UpdatePostDto updatePostDto = createUpdatePostDto("Test Post", invalidBody);

        mockMvc.perform(TestUtils.mockPatchRequest(getUrl(postId), updatePostDto))
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

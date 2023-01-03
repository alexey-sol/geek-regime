package com.github.alexeysol.geekregime.apiposts.controllers.v1.postcontroller;

import com.github.alexeysol.geekregime.apicommons.exceptions.ResourceException;
import com.github.alexeysol.geekregime.apicommons.models.dtos.posts.PostDetailsDto;
import com.github.alexeysol.geekregime.apicommons.utils.TestUtils;
import com.github.alexeysol.geekregime.apicommons.utils.parsers.Json;
import com.github.alexeysol.geekregime.apiposts.models.dtos.UpdatePostDto;
import com.github.alexeysol.geekregime.apiposts.models.entities.Post;
import com.github.alexeysol.geekregime.apiposts.utils.sources.ApiPostsSource;
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
    public void givenDtoIsForExistingPost_whenUpdatePost_thenReturnsDtoWithStatus200()
        throws Exception {

        long postId = 1L;
        Post post = Post.builder()
            .userId(1L)
            .spaceId(1L)
            .title("Test Post")
            .body("Hello World")
            .build();
        UpdatePostDto updatePostDto = UpdatePostDto.builder()
            .title(post.getTitle())
            .body(post.getBody())
            .build();
        PostDetailsDto detailsDto = PostDetailsDto.builder()
            .title(post.getTitle())
            .body(post.getBody())
            .build();

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
        UpdatePostDto updatePostDto = UpdatePostDto.builder()
            .title("Test Post")
            .body("Hello World")
            .build();

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
        UpdatePostDto updatePostDto = UpdatePostDto.builder()
            .title("Test Post")
            .body(invalidBody)
            .build();

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

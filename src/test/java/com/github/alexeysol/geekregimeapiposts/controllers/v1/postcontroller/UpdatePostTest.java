package com.github.alexeysol.geekregimeapiposts.controllers.v1.postcontroller;

import com.github.alexeysol.geekregimeapicommons.constants.ApiResourceExceptionCode;
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceNotFoundException;
import com.github.alexeysol.geekregimeapiposts.TestUtils;
import com.github.alexeysol.geekregimeapiposts.models.dtos.PostDto;
import com.github.alexeysol.geekregimeapiposts.models.dtos.UpdatePostDto;
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
import java.util.Optional;

import static org.mockito.Mockito.when;

public class UpdatePostTest extends BasePostControllerTest {
    public UpdatePostTest(
        @Autowired MockMvc mockMvc,
        @Autowired ApiPostsSourceResolver sourceResolver,
        @Autowired PostMapper postMapper
        ) {
        super(mockMvc, sourceResolver, postMapper);
    }

    @Test
    public void givenDtoIsForExistingPost_whenUpdatePost_thenReturnsDtoWithStatus200()
        throws Exception {

        long postId = 1L;
        String title = "Test Post";
        String body = "Hello World";
        Post post = createPost(title, body);
        UpdatePostDto updatePostDto = createUpdatePostDto(title, body);
        PostDto postDto = convertEntityToPostDto(post);

        when(postService.findPostById(1L)).thenReturn(Optional.of(post));
        when(postService.savePost(Mockito.any(Post.class))).thenReturn(post);

        mockMvc.perform(TestUtils.mockPatchRequest(getUrl(postId), updatePostDto))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(result -> {
                String expected = TestUtils.objectToJsonString(postDto);
                String actual = result.getResponse().getContentAsString();
                Assertions.assertEquals(expected, actual);
            });
    }

    @Test
    public void givenDtoIsForAbsentPost_whenUpdatePost_thenReturnsStatus404()
        throws Exception {

        long absentId = 10L;
        String title = "Test Post";
        String body = "Hello World";
        UpdatePostDto updatePostDto = createUpdatePostDto(title, body);

        when(postService.findPostById(1L)).thenReturn(Optional.empty());

        mockMvc.perform(TestUtils.mockPatchRequest(getUrl(absentId), updatePostDto))
            .andExpect(MockMvcResultMatchers.status().isNotFound())
            .andExpect(result ->
                Assertions.assertTrue(result.getResolvedException() instanceof ResourceNotFoundException)
            )
            .andExpect(result -> MatcherAssert.assertThat(
                Objects.requireNonNull(result.getResolvedException()).getMessage(),
                CoreMatchers.containsString(ApiResourceExceptionCode.NOT_FOUND.toString())
            ));
    }

    @Test
    public void givenDtoIsInvalid_whenUpdatePost_thenReturnsStatus400()
        throws Exception {

        long postId = 1L;
        String invalidTitle = "";
        String invalidBody = "";
        UpdatePostDto updatePostDto = createUpdatePostDto(invalidTitle, invalidBody);

        mockMvc.perform(TestUtils.mockPatchRequest(getUrl(postId), updatePostDto))
            .andExpect(MockMvcResultMatchers.status().isBadRequest())
            .andExpect(result ->
                Assertions.assertTrue(result.getResolvedException() instanceof MethodArgumentNotValidException)
            )
            .andExpect(result -> MatcherAssert.assertThat(
                Objects.requireNonNull(result.getResolvedException()).getMessage(),
                CoreMatchers.containsString(VALIDATION_FAILED_MESSAGE)
            ));
    }
}

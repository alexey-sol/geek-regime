package com.github.alexeysol.geekregime.apiposts.controllers.v1.postcontroller;

import com.github.alexeysol.geekregime.apicommons.exceptions.ResourceException;
import com.github.alexeysol.geekregime.apicommons.models.dtos.posts.PostDetailsDto;
import com.github.alexeysol.geekregime.apicommons.utils.TestUtils;
import com.github.alexeysol.geekregime.apicommons.utils.parsers.Json;
import com.github.alexeysol.geekregime.apiposts.models.dtos.CreatePostDto;
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

        Post post = Post.builder()
            .userId(1L)
            .spaceId(1L)
            .title("Test Post")
            .body("Hello World")
            .build();
        CreatePostDto createPostDto = CreatePostDto.builder()
            .authorId(post.getUserId())
            .spaceId(post.getSpaceId())
            .title(post.getTitle())
            .body(post.getBody())
            .build();
        PostDetailsDto detailsDto = PostDetailsDto.builder()
            .title(post.getTitle())
            .body(post.getBody())
            .build();

        when(postMapper.fromCreatePostDtoToPost(createPostDto)).thenReturn(post);
        when(postService.savePost(post)).thenReturn(post);
        when(postMapper.fromPostToPostDetailsDto(post)).thenReturn(detailsDto);

        mockMvc.perform(TestUtils.mockPostRequest(getUrl(), createPostDto))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(result -> {
                String expected = Json.stringify(detailsDto);
                String actual = result.getResponse().getContentAsString();
                Assertions.assertEquals(expected, actual);
            });
    }

    @Test
    public void givenDtoIsInvalid_whenCreatePost_thenReturnsStatus422()
        throws Exception {

        String invalidTitle = "";
        CreatePostDto createPostDto = CreatePostDto.builder()
            .authorId(1L)
            .spaceId(1L)
            .title(invalidTitle)
            .body("Hello World")
            .build();

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
        Post post = Post.builder()
            .userId(absentUserId)
            .spaceId(1L)
            .title("Test Post")
            .body("Hello World")
            .build();
        CreatePostDto createPostDto = CreatePostDto.builder()
            .authorId(post.getUserId())
            .spaceId(post.getSpaceId())
            .title(post.getTitle())
            .body(post.getBody())
            .build();

        when(postMapper.fromCreatePostDtoToPost(createPostDto)).thenReturn(post);
        when(postService.savePost(post)).thenReturn(post);
        when(postMapper.fromPostToPostDetailsDto(post))
            .thenThrow(new ResourceException(HttpStatus.NOT_FOUND, "huh?"));

        mockMvc.perform(TestUtils.mockPostRequest(getUrl(), createPostDto))
            .andExpect(MockMvcResultMatchers.status().isNotFound())
            .andExpect(result -> {
                Assertions.assertTrue(result.getResolvedException() instanceof ResourceException);
            });
    }
}

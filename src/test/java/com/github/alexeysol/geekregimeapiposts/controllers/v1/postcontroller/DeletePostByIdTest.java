package com.github.alexeysol.geekregimeapiposts.controllers.v1.postcontroller;

import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceNotFoundException;
import com.github.alexeysol.geekregimeapicommons.models.ApiResourceExceptionCode;
import com.github.alexeysol.geekregimeapiposts.sources.ApiPostsSourceResolver;
import org.hamcrest.CoreMatchers;
import org.hamcrest.MatcherAssert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Objects;

import static org.mockito.Mockito.when;

public class DeletePostByIdTest extends BasePostControllerTest {
    public DeletePostByIdTest(
        @Autowired MockMvc mockMvc,
        @Autowired ApiPostsSourceResolver sourceResolver
    ) {
        super(mockMvc, sourceResolver);
    }

    @Test
    public void givenPostExists_whenDeletePostById_thenReturnsPostIdWithStatus200()
    throws Exception {
        long postId = 1L;

        when(postService.removePostById(postId)).thenReturn(postId);

        String url = String.format("%s/%d", apiV1Path, postId);
        mockMvc.perform(MockMvcRequestBuilders.delete(url))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(result -> {
                String expected = String.valueOf(postId);
                String actual = result.getResponse().getContentAsString();
                Assertions.assertEquals(expected, actual);
            });
        }

        @Test
        public void givenPostDoesntExist_whenDeletePostById_thenReturnsStatus404()
        throws Exception {
            long absentPostId = 10L;

            when(postService.removePostById(absentPostId)).thenReturn(-1L);

            String url = String.format("%s/%d", apiV1Path, absentPostId);
            mockMvc.perform(MockMvcRequestBuilders.delete(url))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andExpect(result -> {
                    Assertions.assertTrue(result.getResolvedException() instanceof ResourceNotFoundException);
                })
                .andExpect(result -> {
                    MatcherAssert.assertThat(
                        Objects.requireNonNull(result.getResolvedException()).getMessage(),
                        CoreMatchers.containsString(ApiResourceExceptionCode.NOT_FOUND.toString())
                    );
                });
        }
}

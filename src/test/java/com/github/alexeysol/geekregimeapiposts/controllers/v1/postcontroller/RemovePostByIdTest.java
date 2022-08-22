package com.github.alexeysol.geekregimeapiposts.controllers.v1.postcontroller;

import com.github.alexeysol.geekregimeapicommons.constants.ApiResourceExceptionCode;
import com.github.alexeysol.geekregimeapicommons.constants.DefaultValueConstants;
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceNotFoundException;
import com.github.alexeysol.geekregimeapiposts.utils.mappers.PostMapper;
import com.github.alexeysol.geekregimeapiposts.utils.sources.ApiPostsSourceResolver;
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

public class RemovePostByIdTest extends BasePostControllerTest {
    public RemovePostByIdTest(
        @Autowired MockMvc mockMvc,
        @Autowired ApiPostsSourceResolver sourceResolver,
        @Autowired PostMapper postMapper
    ) {
        super(mockMvc, sourceResolver, postMapper);
    }

    @Test
    public void givenPostExists_whenRemovePostById_thenReturnsPostIdWithStatus200()
        throws Exception {

        long postId = 1L;

        when(postService.removePostById(postId)).thenReturn(postId);

        mockMvc.perform(MockMvcRequestBuilders.delete(getUrl(postId)))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(result -> {
                String expected = String.valueOf(postId);
                String actual = result.getResponse().getContentAsString();
                Assertions.assertEquals(expected, actual);
            });
    }

    @Test
    public void givenPostDoesntExist_whenRemovePostById_thenReturnsStatus404()
        throws Exception {

        long absentPostId = 10L;

        when(postService.removePostById(absentPostId)).thenReturn(DefaultValueConstants.NOT_FOUND_BY_ID);

        mockMvc.perform(MockMvcRequestBuilders.delete(getUrl(absentPostId)))
            .andExpect(MockMvcResultMatchers.status().isNotFound())
            .andExpect(result -> {
                Assertions.assertTrue(result.getResolvedException() instanceof ResourceNotFoundException);
            })
            .andExpect(result -> MatcherAssert.assertThat(
                Objects.requireNonNull(result.getResolvedException()).getMessage(),
                CoreMatchers.containsString(ApiResourceExceptionCode.NOT_FOUND.toString())
            ));
    }
}

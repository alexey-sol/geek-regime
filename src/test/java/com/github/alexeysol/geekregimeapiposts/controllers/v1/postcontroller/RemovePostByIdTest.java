package com.github.alexeysol.geekregimeapiposts.controllers.v1.postcontroller;

import com.github.alexeysol.geekregimeapicommons.constants.DefaultsConstants;
import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceException;
import com.github.alexeysol.geekregimeapicommons.models.dtos.shared.HasIdDto;
import com.github.alexeysol.geekregimeapicommons.utils.Json;
import com.github.alexeysol.geekregimeapiposts.utils.sources.ApiPostsSource;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.Mockito.when;

public class RemovePostByIdTest extends BasePostControllerTest {
    public RemovePostByIdTest(
        @Autowired MockMvc mockMvc,
        @Autowired ApiPostsSource source
    ) {
        super(mockMvc, source);
    }

    @Test
    public void givenPostExists_whenRemovePostById_thenReturnsResultDtoWithStatus200()
        throws Exception {

        long postId = 1L;
        HasIdDto resultDto = new HasIdDto(postId);

        when(postService.removePostById(postId)).thenReturn(postId);
        when(postMapper.fromIdToHasIdDto(postId)).thenReturn(resultDto);

        mockMvc.perform(MockMvcRequestBuilders.delete(getUrl(postId)))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(result -> {
                String expected = Json.stringify(resultDto);
                String actual = result.getResponse().getContentAsString();
                Assertions.assertEquals(expected, actual);
            });
    }

    @Test
    public void givenPostDoesntExist_whenRemovePostById_thenReturnsStatus404()
        throws Exception {

        long absentPostId = 10L;

        when(postService.removePostById(absentPostId)).thenReturn(DefaultsConstants.NOT_FOUND_BY_ID);

        mockMvc.perform(MockMvcRequestBuilders.delete(getUrl(absentPostId)))
            .andExpect(MockMvcResultMatchers.status().isNotFound())
            .andExpect(result -> {
                Assertions.assertTrue(result.getResolvedException() instanceof ResourceException);
            });
    }
}

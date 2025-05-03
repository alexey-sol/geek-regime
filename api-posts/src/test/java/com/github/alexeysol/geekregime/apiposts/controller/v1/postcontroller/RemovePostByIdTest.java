package com.github.alexeysol.geekregime.apiposts.controller.v1.postcontroller;

import com.github.alexeysol.geekregime.apicommons.constant.Default;
import com.github.alexeysol.geekregime.apicommons.exception.ResourceException;
import com.github.alexeysol.geekregime.apicommons.generated.model.IdResponse;
import com.github.alexeysol.geekregime.apicommons.util.parser.Json;
import com.github.alexeysol.geekregime.apiposts.shared.source.ApiPostsSource;
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
    public void givenPostExists_whenRemovePostById_thenReturnsResponseWithStatus200()
        throws Exception {

        var postId = 1L;
        var idResponse = new IdResponse(postId);

        when(service.removePostById(postId)).thenReturn(postId);
        when(mapper.toIdResponse(postId)).thenReturn(idResponse);

        mockMvc.perform(MockMvcRequestBuilders.delete(getUrl(postId)))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(result -> {
                String expected = Json.stringify(idResponse);
                String actual = result.getResponse().getContentAsString();
                Assertions.assertEquals(expected, actual);
            });
    }

    @Test
    public void givenPostDoesntExist_whenRemovePostById_thenReturnsStatus404()
        throws Exception {

        var absentPostId = 10L;

        when(service.removePostById(absentPostId)).thenReturn(Default.NOT_FOUND_BY_ID);

        mockMvc.perform(MockMvcRequestBuilders.delete(getUrl(absentPostId)))
            .andExpect(MockMvcResultMatchers.status().isNotFound())
            .andExpect(result -> {
                Assertions.assertTrue(result.getResolvedException() instanceof ResourceException);
            });
    }
}

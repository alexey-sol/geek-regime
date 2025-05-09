package com.github.alexeysol.geekregime.apiposts.controller.v1.postcontroller;

import com.github.alexeysol.geekregime.apicommons.generated.model.BasePostDetailsResponse;
import com.github.alexeysol.geekregime.apicommons.util.parser.Json;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.PostMeta;
import com.github.alexeysol.geekregime.apiposts.shared.source.ApiPostsSource;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Optional;

import static org.mockito.Mockito.*;

public class FindPostBySlugTest extends BasePostControllerTest {
    public FindPostBySlugTest(
        @Autowired MockMvc mockMvc,
        @Autowired ApiPostsSource source
    ) {
        super(mockMvc, source);
    }

    @Test
    public void givenPostAndAuthorExist_whenFindPostBySlug_thenReturnsResponseWithStatus200()
        throws Exception {

        var post = Post.builder()
            .userId(1L)
            .slug("test-post")
            .meta(new PostMeta())
            .build();
        var postDetailsResponse = new BasePostDetailsResponse();

        when(service.findPostBySlug(post.getSlug())).thenReturn(Optional.of(post));
        doNothing().when(service).incrementViewCountAndSave(post.getId());
        when(mapper.toBasePostDetailsResponse(post)).thenReturn(postDetailsResponse);

        mockMvc.perform(MockMvcRequestBuilders.get(getUrl(post.getSlug())))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(result -> {
                String expected = Json.stringify(postDetailsResponse);
                String actual = result.getResponse().getContentAsString();
                Assertions.assertEquals(expected, actual);
            });
    }

    @Test
    public void givenPostDoesntExist_whenFindPostBySlug_thenReturnsStatus404()
        throws Exception {

        var absentPostSlug = "test-post";

        when(service.findPostBySlug(absentPostSlug)).thenReturn(Optional.empty());

        mockMvc.perform(MockMvcRequestBuilders.get(getUrl(absentPostSlug)))
            .andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}

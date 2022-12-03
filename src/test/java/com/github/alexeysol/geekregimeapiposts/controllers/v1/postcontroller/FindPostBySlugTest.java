package com.github.alexeysol.geekregimeapiposts.controllers.v1.postcontroller;

import com.github.alexeysol.geekregimeapicommons.models.dtos.PostDetailsDto;
import com.github.alexeysol.geekregimeapicommons.utils.Json;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.testutils.Factories;
import com.github.alexeysol.geekregimeapiposts.utils.sources.ApiPostsSource;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Optional;

import static com.github.alexeysol.geekregimeapiposts.testutils.Factories.createPost;
import static org.mockito.Mockito.when;

public class FindPostBySlugTest extends BasePostControllerTest {
    public FindPostBySlugTest(
        @Autowired MockMvc mockMvc,
        @Autowired ApiPostsSource source
    ) {
        super(mockMvc, source);
    }

    @Test
    public void givenPostAndAuthorExist_whenFindPostBySlug_thenReturnsDtoWithStatus200()
        throws Exception {

        String postSlug = "test-post";
        Post post = createPost();
        post.setUserId(1L);
        PostDetailsDto detailsDto = Factories.createDetailsDto();

        when(postService.findPostBySlug(postSlug)).thenReturn(Optional.of(post));
        when(postMapper.fromPostToPostDetailsDto(post)).thenReturn(detailsDto);

        mockMvc.perform(MockMvcRequestBuilders.get(getUrl(postSlug)))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(result -> {
                String expected = Json.stringify(detailsDto);
                String actual = result.getResponse().getContentAsString();
                Assertions.assertEquals(expected, actual);
            });
    }

    @Test
    public void givenPostDoesntExist_whenFindPostBySlug_thenReturnsStatus404()
        throws Exception {

        String absentPostSlug = "test-post";

        when(postService.findPostBySlug(absentPostSlug)).thenReturn(Optional.empty());

        mockMvc.perform(MockMvcRequestBuilders.get(getUrl(absentPostSlug)))
            .andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}

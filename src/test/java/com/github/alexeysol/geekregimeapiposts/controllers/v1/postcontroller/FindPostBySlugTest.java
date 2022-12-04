package com.github.alexeysol.geekregimeapiposts.controllers.v1.postcontroller;

import com.github.alexeysol.geekregimeapicommons.models.dtos.posts.PostDetailsDto;
import com.github.alexeysol.geekregimeapicommons.utils.Json;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.utils.sources.ApiPostsSource;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Optional;

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

        Post post = Post.builder()
            .userId(1L)
            .slug("test-post")
            .build();
        PostDetailsDto detailsDto = new PostDetailsDto();

        when(postService.findPostBySlug(post.getSlug())).thenReturn(Optional.of(post));
        when(postMapper.fromPostToPostDetailsDto(post)).thenReturn(detailsDto);

        mockMvc.perform(MockMvcRequestBuilders.get(getUrl(post.getSlug())))
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

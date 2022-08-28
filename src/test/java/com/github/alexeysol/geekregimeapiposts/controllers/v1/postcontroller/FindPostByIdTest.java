package com.github.alexeysol.geekregimeapiposts.controllers.v1.postcontroller;

import com.github.alexeysol.geekregimeapicommons.utils.Json;
import com.github.alexeysol.geekregimeapiposts.models.dtos.PostDto;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.utils.sources.ApiPostsSourceResolver;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Optional;

import static org.mockito.Mockito.when;

public class FindPostByIdTest extends BasePostControllerTest {
    public FindPostByIdTest(
        @Autowired MockMvc mockMvc,
        @Autowired ApiPostsSourceResolver sourceResolver
    ) {
        super(mockMvc, sourceResolver);
    }

    @Test
    public void givenPostAndAuthorExist_whenFindPostById_thenReturnsDtoWithStatus200()
        throws Exception {

        long postId = 1L;
        long userId = 1L;
        Post post = createPost();
        post.setUserId(userId);
        PostDto postDto = createPostDto();

        when(postService.findPostById(postId)).thenReturn(Optional.of(post));
        when(postMapper.fromPostToPostDto(post)).thenReturn(postDto);


        mockMvc.perform(MockMvcRequestBuilders.get(getUrl(postId)))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(result -> {
                String expected = Json.stringify(postDto);
                String actual = result.getResponse().getContentAsString();
                Assertions.assertEquals(expected, actual);
            });
    }

    @Test
    public void givenPostDoesntExist_whenFindPostById_thenReturnsStatus404()
        throws Exception {

        long absentPostId = 10L;

        when(postService.findPostById(absentPostId)).thenReturn(Optional.empty());

        mockMvc.perform(MockMvcRequestBuilders.get(getUrl(absentPostId)))
            .andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}

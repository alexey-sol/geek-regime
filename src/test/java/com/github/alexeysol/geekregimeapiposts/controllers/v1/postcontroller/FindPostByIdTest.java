package com.github.alexeysol.geekregimeapiposts.controllers.v1.postcontroller;

import com.github.alexeysol.geekregimeapiposts.TestUtils;
import com.github.alexeysol.geekregimeapiposts.models.dtos.PostDto;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.models.dtos.UserDto;
import com.github.alexeysol.geekregimeapiposts.sources.ApiPostsSourceResolver;
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
    public void givenPostAndAuthorExist_whenFindPostById_thenReturnsDetailedPostWithStatus200()
    throws Exception {
        long initialPostId = 1L;
        long initialUserId = 1L;
        Post post = new Post();
        post.setUserId(initialUserId);
        UserDto author = new UserDto();
        Optional<PostDto> detailedPost = Optional.of(new PostDto(post, author));

        when(postService.findPostById(initialPostId)).thenReturn(detailedPost);

        String url = String.format("%s/%d", apiV1Path, initialPostId);
        mockMvc.perform(MockMvcRequestBuilders.get(url))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(result -> {
                String expected = TestUtils.objectToJsonString(detailedPost.get());
                String actual = result.getResponse().getContentAsString();
                Assertions.assertEquals(expected, actual);
            });
        }

        @Test
        public void givenPostDoesntExist_whenFindPostById_thenReturnsStatus404()
        throws Exception {
            long initialPostId = 1L;
            Optional<PostDto> empty = Optional.empty();

            when(postService.findPostById(initialPostId)).thenReturn(empty);

            String url = String.format("%s/%d", apiV1Path, initialPostId);
            mockMvc.perform(MockMvcRequestBuilders.get(url))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
        }
}

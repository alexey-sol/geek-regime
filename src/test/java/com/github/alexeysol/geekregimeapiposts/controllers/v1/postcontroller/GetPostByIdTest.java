package com.github.alexeysol.geekregimeapiposts.controllers.v1.postcontroller;

import com.github.alexeysol.geekregimeapiposts.TestUtils;
import com.github.alexeysol.geekregimeapiposts.models.dtos.DetailedPost;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.models.mappers.User;
import com.github.alexeysol.geekregimeapiposts.sources.ApiPostsSourceResolver;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Optional;

import static org.mockito.Mockito.when;

public class GetPostByIdTest extends BasePostControllerTest {
    public GetPostByIdTest(
        @Autowired MockMvc mockMvc,
        @Autowired ApiPostsSourceResolver sourceResolver
    ) {
        super(mockMvc, sourceResolver);
    }

    @Test
    public void givenPostAndAuthorExist_whenGetPostById_thenReturnsDetailedPostWithStatus200()
    throws Exception {
        long initialPostId = 1L;
        long initialUserId = 1L;
        Post post = new Post();
        post.setUserId(initialUserId);
        User author = new User();
        Optional<DetailedPost> detailedPost = Optional.of(new DetailedPost(post, author));

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
        public void givenPostDoesntExist_whenGetPostById_thenReturnsStatus404()
        throws Exception {
            long initialPostId = 1L;
            Optional<DetailedPost> empty = Optional.empty();

            when(postService.findPostById(initialPostId)).thenReturn(empty);

            String url = String.format("%s/%d", apiV1Path, initialPostId);
            mockMvc.perform(MockMvcRequestBuilders.get(url))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
        }
}

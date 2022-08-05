package com.github.alexeysol.geekregimeapiposts.controllers.v1.postcontroller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.alexeysol.geekregimeapiposts.models.dtos.DetailedPost;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.models.mappers.User;
import com.github.alexeysol.geekregimeapiposts.sources.ApiPostsSourceResolver;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Optional;

import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureMockMvc
public class GetPostByIdTest extends BasePostControllerTest {
    private final ObjectMapper objectMapper = new ObjectMapper();

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
        Optional<Post> optionalOfPost = Optional.of(post);
        DetailedPost detailedPost = new DetailedPost(post, author);

        when(postService.findPostById(initialPostId)).thenReturn(optionalOfPost);
        when(userService.getUser(initialUserId)).thenReturn(author);

        String url = String.format("%s/%d", apiV1Path, initialPostId);
        mockMvc.perform(MockMvcRequestBuilders.get(url))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(result -> {
                String expected = objectMapper.writeValueAsString(detailedPost);
                String actual = result.getResponse().getContentAsString();
                Assertions.assertEquals(expected, actual);
            });
    }
}

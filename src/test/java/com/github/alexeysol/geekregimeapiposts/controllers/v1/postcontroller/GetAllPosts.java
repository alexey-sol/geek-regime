package com.github.alexeysol.geekregimeapiposts.controllers.v1.postcontroller;

import com.github.alexeysol.geekregimeapiposts.TestUtils;
import com.github.alexeysol.geekregimeapiposts.models.dtos.DetailedPost;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.models.mappers.User;
import com.github.alexeysol.geekregimeapiposts.sources.ApiPostsSourceResolver;
import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureMockMvc
public class GetAllPosts extends BasePostControllerTest {
    private final long initialPostId1 = 1L;
    private final long initialPostId2 = 2L;
    private final Post post1 = new Post();
    private final Post post2 = new Post();
    private final DetailedPost detailedPost1 = new DetailedPost(post1, new User());
    private final DetailedPost detailedPost2 = new DetailedPost(post2, new User());

    public GetAllPosts(
        @Autowired MockMvc mockMvc,
        @Autowired ApiPostsSourceResolver sourceResolver
    ) {
        super(mockMvc, sourceResolver);
    }

    @Test
    public void allPostsExist_whenGetAllPosts_thenReturnsDetailedPostListWithStatus200()
    throws Exception {
        ArrayList<Post> posts = new ArrayList<>();
        posts.add(post1);
        posts.add(post2);
        List<DetailedPost> detailedPosts = new ArrayList<>();
        detailedPosts.add(detailedPost1);
        detailedPosts.add(detailedPost2);

        when(postService.findAllPosts()).thenReturn(posts);
        when(postService.convertAllPostsToDetailedPosts(posts)).thenReturn(detailedPosts);

        mockMvc.perform(MockMvcRequestBuilders.get(apiV1Path))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$").isArray())
            .andExpect(MockMvcResultMatchers.jsonPath("$").isNotEmpty())
            .andExpect(result -> {
                responseContentEqualsProvidedList(result.getResponse(), detailedPosts);
            });
    }

    @Test
    public void postsDontExist_whenGetAllPosts_thenReturnsEmptyListWithStatus200()
    throws Exception {
        ArrayList<Post> posts = new ArrayList<>();
        List<DetailedPost> detailedPosts = new ArrayList<>();

        when(postService.findAllPosts()).thenReturn(posts);
        when(postService.convertAllPostsToDetailedPosts(posts)).thenReturn(detailedPosts);

        mockMvc.perform(MockMvcRequestBuilders.get(apiV1Path))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$").isArray())
            .andExpect(MockMvcResultMatchers.jsonPath("$").isEmpty())
            .andExpect(result -> {
                responseContentEqualsProvidedList(result.getResponse(), detailedPosts);
            });
    }

    @Test
    public void allPostsExist_whenGetAllPostsById_thenReturnsPostListWithStatus200()
    throws Exception {
        ArrayList<Post> posts = new ArrayList<>();
        posts.add(post1);
        posts.add(post2);
        List<DetailedPost> detailedPosts = new ArrayList<>();
        detailedPosts.add(detailedPost1);
        detailedPosts.add(detailedPost2);
        List<Long> postIds = new ArrayList<>();
        postIds.add(initialPostId1);
        postIds.add(initialPostId2);

        when(postService.findAllPostsById(postIds)).thenReturn(posts);
        when(postService.convertAllPostsToDetailedPosts(posts)).thenReturn(detailedPosts);

        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get(apiV1Path)
            .queryParam("ids", String.valueOf(initialPostId1), String.valueOf(initialPostId2));

        mockMvc.perform(requestBuilder)
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$").isArray())
            .andExpect(MockMvcResultMatchers.jsonPath("$").isNotEmpty())
            .andExpect(result -> {
                responseContentEqualsProvidedList(result.getResponse(), detailedPosts);
            });
    }

    @Test
    public void fewPostsExist_whenGetAllPostsById_thenReturnsPostListWithStatus200()
    throws Exception {
        long absentPostId1 = 10L;
        long absentPostId2 = 11L;
        ArrayList<Post> posts = new ArrayList<>();
        posts.add(post1);
        List<DetailedPost> detailedPosts = new ArrayList<>();
        detailedPosts.add(detailedPost1);
        List<Long> postIds = new ArrayList<>();
        postIds.add(initialPostId1);
        postIds.add(absentPostId1);
        postIds.add(absentPostId2);

        when(postService.findAllPostsById(postIds)).thenReturn(posts);
        when(postService.convertAllPostsToDetailedPosts(posts)).thenReturn(detailedPosts);

        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get(apiV1Path)
            .queryParam("ids", String.valueOf(initialPostId1), String.valueOf(absentPostId1),
                String.valueOf(absentPostId2));

        mockMvc.perform(requestBuilder)
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$").isArray())
            .andExpect(MockMvcResultMatchers.jsonPath("$").isNotEmpty())
            .andExpect(result -> {
                responseContentEqualsProvidedList(result.getResponse(), detailedPosts);
            });
    }

    @Test
    public void postsDontExist_whenGetAllPostsById_thenReturnsEmptyListWithStatus200()
    throws Exception {
        long absentPostId1 = 10L;
        long absentPostId2 = 11L;
        ArrayList<Post> posts = new ArrayList<>();
        List<DetailedPost> detailedPosts = new ArrayList<>();
        List<Long> postIds = new ArrayList<>();
        postIds.add(absentPostId1);
        postIds.add(absentPostId2);

        when(postService.findAllPostsById(postIds)).thenReturn(posts);
        when(postService.convertAllPostsToDetailedPosts(posts)).thenReturn(detailedPosts);

        mockMvc.perform(MockMvcRequestBuilders.get(apiV1Path))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$").isArray())
            .andExpect(MockMvcResultMatchers.jsonPath("$").isEmpty())
            .andExpect(result -> {
                responseContentEqualsProvidedList(result.getResponse(), detailedPosts);
            });
    }

    private <Item> void responseContentEqualsProvidedList(
        MockHttpServletResponse response,
        List<Item> list
    ) throws UnsupportedEncodingException {
        String contentAsString = response.getContentAsString();
        Assertions.assertEquals(TestUtils.objectToJsonString(list), contentAsString);
        Assertions.assertEquals(list.size(), (Integer) JsonPath.read(contentAsString, "$.length()"));
    }
}

package com.github.alexeysol.geekregimeapiposts.controllers.v1.postcontroller;

import com.github.alexeysol.geekregimeapicommons.utils.converters.QueryConverter;
import com.github.alexeysol.geekregimeapiposts.TestUtils;
import com.github.alexeysol.geekregimeapiposts.models.dtos.DetailedPost;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.models.mappers.User;
import com.github.alexeysol.geekregimeapiposts.sources.ApiPostsSourceResolver;
import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;

public class GetAllPosts extends BasePostControllerTest {
    private final QueryConverter queryConverterStub = new QueryConverter("", "");
    private final Pageable pageableStub = queryConverterStub.getPageable();

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
    public void allPostsExist_whenGetAllPosts_thenReturnsPageWithFullListAndWithStatus200()
    throws Exception {
        List<DetailedPost> detailedPosts = List.of(detailedPost1, detailedPost2);
        Page<DetailedPost> page = new PageImpl<>(detailedPosts, pageableStub, detailedPosts.size());

        when(postService.findAllPosts(Mockito.any(Pageable.class))).thenReturn(page);

        mockMvc.perform(MockMvcRequestBuilders.get(apiV1Path))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isArray())
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isNotEmpty())
            .andExpect(result -> {
                responseContentEqualsProvidedPage(result.getResponse(), page);
            });
    }

    @Test
    public void postsDontExist_whenGetAllPosts_thenReturnsEmptyPageWithStatus200()
    throws Exception {
        List<DetailedPost> detailedPosts = new ArrayList<>();
        Page<DetailedPost> page = new PageImpl<>(detailedPosts, pageableStub, 0);

        when(postService.findAllPosts(Mockito.any(Pageable.class))).thenReturn(page);

        mockMvc.perform(MockMvcRequestBuilders.get(apiV1Path))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isArray())
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isEmpty())
            .andExpect(result -> {
                responseContentEqualsProvidedPage(result.getResponse(), page);
            });
    }

    private <ValueType> void responseContentEqualsProvidedPage(
        MockHttpServletResponse response,
        Page<ValueType> page
    ) throws UnsupportedEncodingException {
        String contentAsString = response.getContentAsString();
        int expectedPageContentSize = page.getContent().size();
        int actualPageContentSize = JsonPath.read(contentAsString, "$.content.length()");

        Assertions.assertEquals(TestUtils.objectToJsonString(page), contentAsString);
        Assertions.assertEquals(expectedPageContentSize, actualPageContentSize);
    }
}

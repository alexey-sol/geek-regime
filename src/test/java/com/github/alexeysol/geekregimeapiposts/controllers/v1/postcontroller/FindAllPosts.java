package com.github.alexeysol.geekregimeapiposts.controllers.v1.postcontroller;

import com.github.alexeysol.geekregimeapicommons.utils.converters.QueryConverter;
import com.github.alexeysol.geekregimeapiposts.TestUtils;
import com.github.alexeysol.geekregimeapiposts.models.dtos.PostDto;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.utils.mappers.PostMapper;
import com.github.alexeysol.geekregimeapiposts.utils.sources.ApiPostsSourceResolver;
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

public class FindAllPosts extends BasePostControllerTest {
    private final QueryConverter queryConverterStub = new QueryConverter("", "");
    private final Pageable pageableStub = queryConverterStub.getPageable();

    public FindAllPosts(
        @Autowired MockMvc mockMvc,
        @Autowired ApiPostsSourceResolver sourceResolver,
        @Autowired PostMapper postMapper
    ) {
        super(mockMvc, sourceResolver, postMapper);
    }

    @Test
    public void allPostsExist_whenFindAllPosts_thenReturnsPageContainingAllDtosWithStatus200()
        throws Exception {

        List<Post> posts = List.of(createPost(), createPost(), createPost());
        Page<Post> postPage = new PageImpl<>(posts, pageableStub, posts.size());

        List<PostDto> postDtos = convertAllEntitiesToPostDtos(posts);
        Page<PostDto> postDtoPage = new PageImpl<>(postDtos, pageableStub, postDtos.size());

        when(postService.findAllPosts(Mockito.any(Pageable.class))).thenReturn(postPage);

        mockMvc.perform(MockMvcRequestBuilders.get(getUrl()))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isArray())
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isNotEmpty())
            .andExpect(result -> {
                responseContentEqualsProvidedPage(result.getResponse(), postDtoPage);
            });
    }

    @Test
    public void postsDontExist_whenFindAllPosts_thenReturnsPageContainingNothingWithStatus200()
        throws Exception {

        int total = 0;
        Page<Post> postPage = new PageImpl<>(new ArrayList<>(), pageableStub, total);
        Page<PostDto> postDtoPage = new PageImpl<>(new ArrayList<>(), pageableStub, total);

        when(postService.findAllPosts(Mockito.any(Pageable.class))).thenReturn(postPage);

        mockMvc.perform(MockMvcRequestBuilders.get(getUrl()))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isArray())
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isEmpty())
            .andExpect(result -> {
                responseContentEqualsProvidedPage(result.getResponse(), postDtoPage);
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

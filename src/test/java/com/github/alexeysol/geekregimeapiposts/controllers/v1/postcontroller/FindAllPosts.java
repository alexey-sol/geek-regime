package com.github.alexeysol.geekregimeapiposts.controllers.v1.postcontroller;

import com.github.alexeysol.geekregimeapicommons.utils.TestUtils;
import com.github.alexeysol.geekregimeapicommons.utils.converters.PageableConverter;
import com.github.alexeysol.geekregimeapiposts.models.dtos.PostDto;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.utils.sources.ApiPostsSourceResolver;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;

public class FindAllPosts extends BasePostControllerTest {
    private final PageableConverter pageableConverterStub = new PageableConverter("", "");
    private final Pageable pageableStub = pageableConverterStub.getPageable();

    public FindAllPosts(
        @Autowired MockMvc mockMvc,
        @Autowired ApiPostsSourceResolver sourceResolver
    ) {
        super(mockMvc, sourceResolver);
    }

    @Test
    public void allPostsExist_whenFindAllPosts_thenReturnsPageContainingFullDtoListWithStatus200()
        throws Exception {

        List<Post> posts = List.of(createPost(), createPost(), createPost());
        Page<Post> postPage = new PageImpl<>(posts, pageableStub, posts.size());

        List<PostDto> postDtoList = List.of(createPostDto(), createPostDto(), createPostDto());
        Page<PostDto> postDtoPage = new PageImpl<>(postDtoList, pageableStub, postDtoList.size());

        when(postService.findAllPosts(Mockito.any(Pageable.class))).thenReturn(postPage);
        when(postMapper.fromPostListToPostDtoList(posts)).thenReturn(postDtoList);

        mockMvc.perform(MockMvcRequestBuilders.get(getUrl()))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isArray())
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isNotEmpty())
            .andExpect(result -> {
                String contentAsString = result.getResponse().getContentAsString();
                TestUtils.responseContentEqualsProvidedPage(postDtoPage, contentAsString);
            });
    }

    @Test
    public void postsDontExist_whenFindAllPosts_thenReturnsPageContainingNothingWithStatus200()
        throws Exception {

        List<Post> emptyPostList = List.of();
        Page<Post> emptyPostPage = new PageImpl<>(new ArrayList<>(), pageableStub, 0);

        List<PostDto> emptyPostDtoList = List.of();
        Page<PostDto> emptyPostDtoPage = new PageImpl<>(new ArrayList<>(), pageableStub, 0);

        when(postService.findAllPosts(Mockito.any(Pageable.class))).thenReturn(emptyPostPage);
        when(postMapper.fromPostListToPostDtoList(emptyPostList)).thenReturn(emptyPostDtoList);

        mockMvc.perform(MockMvcRequestBuilders.get(getUrl()))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isArray())
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isEmpty())
            .andExpect(result -> {
                String contentAsString = result.getResponse().getContentAsString();
                TestUtils.responseContentEqualsProvidedPage(emptyPostDtoPage, contentAsString);
            });
    }
}

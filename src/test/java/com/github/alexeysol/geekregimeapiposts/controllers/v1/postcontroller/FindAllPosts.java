package com.github.alexeysol.geekregimeapiposts.controllers.v1.postcontroller;

import com.github.alexeysol.geekregimeapicommons.models.dtos.PostPreviewDto;
import com.github.alexeysol.geekregimeapicommons.utils.TestUtils;
import com.github.alexeysol.geekregimeapicommons.utils.converters.PageableConverter;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.testutils.Factories;
import com.github.alexeysol.geekregimeapiposts.utils.sources.ApiPostsSource;
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

import static com.github.alexeysol.geekregimeapiposts.testutils.Factories.createPost;
import static org.mockito.Mockito.when;

public class FindAllPosts extends BasePostControllerTest {
    private final PageableConverter pageableConverterStub = new PageableConverter("", "");
    private final Pageable pageableStub = pageableConverterStub.getPageable();

    public FindAllPosts(
        @Autowired MockMvc mockMvc,
        @Autowired ApiPostsSource source
    ) {
        super(mockMvc, source);
    }

    @Test
    public void allPostsExist_whenFindAllPosts_thenReturnsPageContainingFullDtoListWithStatus200()
        throws Exception {

        List<Post> posts = List.of(createPost(), createPost(), createPost());
        Page<Post> postPage = new PageImpl<>(posts, pageableStub, posts.size());

        List<PostPreviewDto> previewDtoList = List.of(
            Factories.createPreviewDto(),
            Factories.createPreviewDto(),
            Factories.createPreviewDto()
        );
        Page<PostPreviewDto> previewDtoPage = new PageImpl<>(previewDtoList, pageableStub, previewDtoList.size());

        when(postService.findAllPosts(Mockito.any(Pageable.class))).thenReturn(postPage);
        when(postMapper.fromPostListToPostPreviewDtoList(posts)).thenReturn(previewDtoList);

        mockMvc.perform(MockMvcRequestBuilders.get(getUrl()))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isArray())
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isNotEmpty())
            .andExpect(result -> {
                String contentAsString = result.getResponse().getContentAsString();
                TestUtils.responseContentEqualsProvidedPage(previewDtoPage, contentAsString);
            });
    }

    @Test
    public void postsDontExist_whenFindAllPosts_thenReturnsPageContainingNothingWithStatus200()
        throws Exception {

        List<Post> emptyPostList = List.of();
        Page<Post> emptyPostPage = new PageImpl<>(new ArrayList<>(), pageableStub, 0);

        List<PostPreviewDto> emptyDtoList = List.of();
        Page<PostPreviewDto> emptyDtoPage = new PageImpl<>(new ArrayList<>(), pageableStub, 0);

        when(postService.findAllPosts(Mockito.any(Pageable.class))).thenReturn(emptyPostPage);
        when(postMapper.fromPostListToPostPreviewDtoList(emptyPostList)).thenReturn(emptyDtoList);

        mockMvc.perform(MockMvcRequestBuilders.get(getUrl()))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isArray())
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isEmpty())
            .andExpect(result -> {
                String contentAsString = result.getResponse().getContentAsString();
                TestUtils.responseContentEqualsProvidedPage(emptyDtoPage, contentAsString);
            });
    }
}

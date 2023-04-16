package com.github.alexeysol.geekregime.apiposts.controllers.v1.postcontroller;

import com.github.alexeysol.geekregime.apicommons.models.dtos.posts.PostPreviewDto;
import com.github.alexeysol.geekregime.apicommons.utils.TestUtils;
import com.github.alexeysol.geekregime.apicommons.utils.converters.PageableConverter;
import com.github.alexeysol.geekregime.apiposts.models.entities.Post;
import com.github.alexeysol.geekregime.apiposts.utils.sources.ApiPostsSource;
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
    private final Pageable pageableStub = pageableConverterStub.getValue();

    public FindAllPosts(
        @Autowired MockMvc mockMvc,
        @Autowired ApiPostsSource source
    ) {
        super(mockMvc, source);
    }

    @Test
    public void allPostsExist_whenFindAllPosts_thenReturnsPageContainingDtoListWithStatus200()
        throws Exception {

        List<Post> posts = List.of(new Post(), new Post(), new Post());
        Page<Post> postPage = new PageImpl<>(posts, pageableStub, posts.size());

        List<PostPreviewDto> previewDtoList = List.of(new PostPreviewDto(), new PostPreviewDto(),
            new PostPreviewDto());
        Page<PostPreviewDto> previewDtoPage = new PageImpl<>(previewDtoList, pageableStub, previewDtoList.size());

        when(service.findAllPosts(Mockito.any(Pageable.class))).thenReturn(postPage);
        when(mapper.fromPostListToPostPreviewDtoList(posts)).thenReturn(previewDtoList);

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

        when(service.findAllPosts(Mockito.any(Pageable.class))).thenReturn(emptyPostPage);
        when(mapper.fromPostListToPostPreviewDtoList(emptyPostList)).thenReturn(emptyDtoList);

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

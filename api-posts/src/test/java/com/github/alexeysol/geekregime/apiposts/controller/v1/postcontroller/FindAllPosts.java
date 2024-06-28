package com.github.alexeysol.geekregime.apiposts.controller.v1.postcontroller;

import com.github.alexeysol.geekregime.apicommons.generated.model.PostPreviewPageResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.PostPreviewResponse;
import com.github.alexeysol.geekregime.apicommons.util.parser.Json;
import com.github.alexeysol.geekregime.apiposts.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.util.source.ApiPostsSource;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;

import static com.github.alexeysol.geekregime.apicommons.constant.Default.PAGE_SIZE;
import static org.mockito.Mockito.when;

public class FindAllPosts extends BasePostControllerTest {
    private final Pageable pageableStub = Pageable.ofSize(PAGE_SIZE);

    public FindAllPosts(
        @Autowired MockMvc mockMvc,
        @Autowired ApiPostsSource source
    ) {
        super(mockMvc, source);
    }

    @Test
    public void allPostsExist_whenFindAllPosts_thenReturnsPageContainingDtoListWithStatus200()
        throws Exception {

        var postList = List.of(new Post(), new Post(), new Post());
        var postPage = new PageImpl<>(postList, pageableStub, postList.size());

        var dtoList = List.of(new PostPreviewResponse(), new PostPreviewResponse(),
            new PostPreviewResponse());
        var dtoPage = new PostPreviewPageResponse(dtoList, postPage.getSize(), postPage.getTotalElements());

        when(service.findAllPosts(Mockito.any(Pageable.class))).thenReturn(postPage);
        when(mapper.toPostPreviewListResponse(postList)).thenReturn(dtoList);

        mockMvc.perform(MockMvcRequestBuilders.get(getUrl()))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isArray())
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isNotEmpty())
            .andExpect(result -> {
                String contentAsString = result.getResponse().getContentAsString();
                Assertions.assertEquals(Json.stringify(dtoPage), contentAsString);
            });
    }

    @Test
    public void postsDontExist_whenFindAllPosts_thenReturnsEmptyPageWithStatus200()
        throws Exception {

        List<Post> emptyPostList = List.of();
        var emptyPostPage = new PageImpl<Post>(new ArrayList<>(), pageableStub, 0);

        List<PostPreviewResponse> emptyDtoList = List.of();
        var emptyDtoPage = new PostPreviewPageResponse(new ArrayList<>(), emptyPostPage.getSize(), emptyPostPage.getTotalElements());

        when(service.findAllPosts(Mockito.any(Pageable.class))).thenReturn(emptyPostPage);
        when(mapper.toPostPreviewListResponse(emptyPostList)).thenReturn(emptyDtoList);

        mockMvc.perform(MockMvcRequestBuilders.get(getUrl()))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isArray())
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isEmpty())
            .andExpect(result -> {
                String contentAsString = result.getResponse().getContentAsString();
                Assertions.assertEquals(Json.stringify(emptyDtoPage), contentAsString);
            });
    }
}

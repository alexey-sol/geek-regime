package com.github.alexeysol.geekregime.apiposts.controller.v1.postcontroller;

import com.github.alexeysol.geekregime.apicommons.generated.model.BasePostPreviewPageResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.BasePostPreviewResponse;
import com.github.alexeysol.geekregime.apicommons.util.parser.Json;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.shared.source.ApiPostsSource;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
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
    public void allPostsExist_whenFindAllPosts_thenReturnsPageResponseWithStatus200()
        throws Exception {

        var posts = List.of(new Post(), new Post(), new Post());
        var postPage = new PageImpl<>(posts, pageableStub, posts.size());

        var postPreviewResponses = List.of(new BasePostPreviewResponse(), new BasePostPreviewResponse(),
            new BasePostPreviewResponse());
        var postPreviewPageResponse = new BasePostPreviewPageResponse(postPreviewResponses,
                postPage.getSize(), postPage.getTotalElements());

        when(service.findAllPosts(Mockito.any(Specification.class), Mockito.any(Pageable.class))).thenReturn(postPage);
        when(mapper.toBasePostPreviewListResponse(posts)).thenReturn(postPreviewResponses);

        mockMvc.perform(MockMvcRequestBuilders.get(getUrl()))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isArray())
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isNotEmpty())
            .andExpect(result -> {
                String contentAsString = result.getResponse().getContentAsString();
                Assertions.assertEquals(Json.stringify(postPreviewPageResponse), contentAsString);
            });
    }

    @Test
    public void postsDontExist_whenFindAllPosts_thenReturnsEmptyPageResponseWithStatus200()
        throws Exception {

        List<Post> emptyList = List.of();
        var emptyPage = new PageImpl<Post>(new ArrayList<>(), pageableStub, 0);

        List<BasePostPreviewResponse> emptyPostPreviewResponseList = List.of();
        var emptyPostPreviewPageResponse = new BasePostPreviewPageResponse(new ArrayList<>(), emptyPage.getSize(),
            emptyPage.getTotalElements());

        when(service.findAllPosts(Mockito.any(Specification.class), Mockito.any(Pageable.class))).thenReturn(emptyPage);
        when(mapper.toBasePostPreviewListResponse(emptyList)).thenReturn(emptyPostPreviewResponseList);

        mockMvc.perform(MockMvcRequestBuilders.get(getUrl()))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isArray())
            .andExpect(MockMvcResultMatchers.jsonPath("$.content").isEmpty())
            .andExpect(result -> {
                String contentAsString = result.getResponse().getContentAsString();
                Assertions.assertEquals(Json.stringify(emptyPostPreviewPageResponse), contentAsString);
            });
    }
}

package com.github.alexeysol.geekregimeapiposts.controllers.v1.postcontroller;

import com.github.alexeysol.geekregimeapiposts.models.dtos.CreatePostDto;
import com.github.alexeysol.geekregimeapiposts.models.dtos.PostDto;
import com.github.alexeysol.geekregimeapiposts.models.dtos.UpdatePostDto;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.services.v1.UserService;
import com.github.alexeysol.geekregimeapiposts.utils.mappers.PostMapper;
import com.github.alexeysol.geekregimeapiposts.utils.sources.ApiPostsSourceResolver;
import com.github.alexeysol.geekregimeapiposts.constants.PathConstants;
import com.github.alexeysol.geekregimeapiposts.services.v1.PostService;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
public abstract class BasePostControllerTest {
    protected final String VALIDATION_FAILED_MESSAGE = "Validation failed";

    protected MockMvc mockMvc;
    protected ApiPostsSourceResolver sourceResolver;
    protected PostMapper postMapper;
    protected String apiV1Path;

    @MockBean
    protected PostService postService;

    @MockBean
    protected UserService userService;

    public BasePostControllerTest(
        MockMvc mockMvc,
        ApiPostsSourceResolver sourceResolver,
        PostMapper postMapper
    ) {
        this.mockMvc = mockMvc;
        this.sourceResolver = sourceResolver;
        this.postMapper = postMapper;
        this.apiV1Path = sourceResolver.getApiPath(PathConstants.V1);
    }

    protected String getUrl() {
        return apiV1Path;
    }

    protected String getUrl(long id) {
        return String.format("%s/%d", apiV1Path, id);
    }

    protected List<PostDto> convertAllEntitiesToPostDtos(List<Post> posts) {
        return postMapper.allEntitiesToPostDtos(posts);
    }

    protected PostDto convertEntityToPostDto(Post post) {
        return postMapper.entityToPostDto(post);
    }

    protected CreatePostDto createCreatePostDto(String title, String body) {
        CreatePostDto dto = new CreatePostDto();
        dto.setTitle(title);
        dto.setBody(body);
        return dto;
    }

    protected UpdatePostDto createUpdatePostDto(String title, String body) {
        UpdatePostDto dto = new UpdatePostDto();
        dto.setTitle(title);
        dto.setBody(body);
        return dto;
    }

    protected Post createPost() {
        return createPost("", "");
    }

    protected Post createPost(String title, String body) {
        Post post = new Post();
        post.setTitle(title);
        post.setBody(body);
        return post;
    }
}

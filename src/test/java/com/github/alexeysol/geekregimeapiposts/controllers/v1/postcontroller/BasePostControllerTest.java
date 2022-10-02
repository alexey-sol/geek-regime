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

@SpringBootTest
@AutoConfigureMockMvc
public abstract class BasePostControllerTest {
    protected final String VALIDATION_FAILED_MESSAGE = "Validation failed";

    protected MockMvc mockMvc;
    protected ApiPostsSourceResolver sourceResolver;
    protected String apiV1Path;

    @MockBean
    protected PostService postService;

    @MockBean
    protected UserService userService;

    @MockBean
    protected PostMapper postMapper;

    public BasePostControllerTest(
        MockMvc mockMvc,
        ApiPostsSourceResolver sourceResolver
    ) {
        this.mockMvc = mockMvc;
        this.sourceResolver = sourceResolver;
        this.apiV1Path = sourceResolver.getApiPath(PathConstants.V1);
    }

    protected String getUrl() {
        return apiV1Path;
    }

    protected String getUrl(long id) {
        return getUrl(String.valueOf(id));
    }

    protected String getUrl(String id) {
        return String.format("%s/%s", apiV1Path, id);
    }

    protected CreatePostDto createCreatePostDto(
        long userId,
        long spaceId,
        String title,
        String body
    ) {
        CreatePostDto dto = new CreatePostDto();
        dto.setUserId(userId);
        dto.setSpaceId(spaceId);
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
        return createPost(0, 0, "", "");
    }

    protected Post createPost(long userId, long spaceId, String title, String body) {
        Post post = new Post();
        post.setUserId(userId);
        post.setSpaceId(spaceId);
        post.setTitle(title);
        post.setBody(body);
        return post;
    }

    protected PostDto createPostDto() {
        return createPostDto("", "");
    }

    protected PostDto createPostDto(String title, String body) {
        PostDto post = new PostDto();
        post.setTitle(title);
        post.setBody(body);
        return post;
    }
}

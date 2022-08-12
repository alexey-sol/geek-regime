package com.github.alexeysol.geekregimeapiposts.controllers.v1.postcontroller;

import com.github.alexeysol.geekregimeapiposts.services.v1.UserService;
import com.github.alexeysol.geekregimeapiposts.sources.ApiPostsSourceResolver;
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
    protected PostService postService = null;

    @MockBean
    protected UserService userService = null;

    public BasePostControllerTest(
        MockMvc mockMvc,
        ApiPostsSourceResolver sourceResolver
    ) {
        this.mockMvc = mockMvc;
        this.sourceResolver = sourceResolver;
        this.apiV1Path = sourceResolver.getApiPath(PathConstants.V1);
    }
}

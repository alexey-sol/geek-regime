package com.github.alexeysol.geekregime.apiposts.controllers.v1.postcontroller;

import com.github.alexeysol.geekregime.apiposts.utils.mappers.PostMapper;
import com.github.alexeysol.geekregime.apiposts.utils.sources.ApiPostsSource;
import com.github.alexeysol.geekregime.apiposts.constants.PathConstants;
import com.github.alexeysol.geekregime.apiposts.services.v1.PostService;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
public abstract class BasePostControllerTest {
    protected final String VALIDATION_FAILED_MESSAGE = "Validation failed";

    protected MockMvc mockMvc;
    protected ApiPostsSource source;
    protected String apiV1Path;

    @MockBean
    protected PostService postService;

    @MockBean
    protected PostMapper postMapper;

    public BasePostControllerTest(
        MockMvc mockMvc,
        ApiPostsSource source
    ) {
        this.mockMvc = mockMvc;
        this.source = source;
        this.apiV1Path = source.getApiPath(PathConstants.V1);
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
}

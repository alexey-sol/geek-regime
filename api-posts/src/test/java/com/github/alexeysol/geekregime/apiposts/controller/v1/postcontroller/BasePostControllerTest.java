package com.github.alexeysol.geekregime.apiposts.controller.v1.postcontroller;

import com.github.alexeysol.geekregime.apiposts.feature.post.service.v1.PostService;
import com.github.alexeysol.geekregime.apiposts.feature.post.mapper.PostMapper;
import com.github.alexeysol.geekregime.apiposts.shared.source.ApiPostsSource;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static com.github.alexeysol.geekregime.apicommons.constant.ResourceConstant.POSTS;
import static com.github.alexeysol.geekregime.apiposts.shared.constant.PathConstant.*;

@SpringBootTest
@AutoConfigureMockMvc
public abstract class BasePostControllerTest {
    protected final String VALIDATION_FAILED_MESSAGE = "Validation failed";
    protected final String API_PATH_V1 = String.format("/%s/%s", API_PREFIX_V1, POSTS);

    protected final MockMvc mockMvc;
    protected final ApiPostsSource source;

    @MockBean
    protected PostService service;

    @MockBean
    protected PostMapper mapper;

    public BasePostControllerTest(
        MockMvc mockMvc,
        ApiPostsSource source
    ) {
        this.mockMvc = mockMvc;
        this.source = source;
    }

    protected String getUrl() {
        return API_PATH_V1;
    }

    protected String getUrl(long id) {
        return getUrl(String.valueOf(id));
    }

    protected String getUrl(String id) {
        return String.format("%s/%s", API_PATH_V1, id);
    }
}
